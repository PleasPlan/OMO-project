package com.OmObe.OmO.auth.filter;

import com.OmObe.OmO.auth.jwt.JwtTokenizer;
import com.OmObe.OmO.auth.jwt.TokenService;
import com.OmObe.OmO.member.dto.MemberLoginDto;
import com.OmObe.OmO.member.entity.Member;
import com.OmObe.OmO.redis.RedisService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter { // username/password 기반 인증 처리
    private final AuthenticationManager authenticationManager;
    private final JwtTokenizer jwtTokenizer;
    private final TokenService tokenService;
    private final RedisService redisService;

    // 인증 시도 로직
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
        // 클라이언트에서 전송한 username/password DTO 클래스 역직렬화
        ObjectMapper objectMapper = new ObjectMapper();
        MemberLoginDto loginDto = objectMapper.readValue(request.getInputStream(), MemberLoginDto.class);

        // username/password 포함한 UsernamePasswordAuthenticationToken 생성
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword());

        return authenticationManager.authenticate(authenticationToken); // 인증처리 위임
    }

    // 인증에 성공할 경우 호출되는 메서드
    @Override
    protected void successfulAuthentication(HttpServletRequest request,
                                            HttpServletResponse response,
                                            FilterChain chain,
                                            Authentication authResult) throws ServletException, IOException {
        Member member = (Member) authResult.getPrincipal(); // Member엔티티 클래스의 객체 획득

        String accessToken = tokenService.delegateAccessToken(member); // access token 생성
        String refreshToken = tokenService.delegateRefreshToken(member); // refresh token 생성
        String memberId = String.valueOf(member.getMemberId()); // 로그인 성공 응답으로 memberId 추가

        // response header에 access token, refresh token, memberId 추가
        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);
        response.setHeader("memberId", memberId);

        // redis에 로그인 한 사용자의 refresh token이 없으면 해당 토큰을 redis에 저장
        if (redisService.getRefreshToken(refreshToken) == null) {
            redisService.setRefreshToken(refreshToken, member.getEmail(), jwtTokenizer.getRefreshTokenExpirationMinutes());
            log.info("Refresh Token Saved in Redis");
        }

        // 로그인 인증 성공 후 MemberAuthenticationSuccessHandler의 onAuthenticationSuccess() 호출
        this.getSuccessHandler().onAuthenticationSuccess(request, response, authResult);
    }
}
