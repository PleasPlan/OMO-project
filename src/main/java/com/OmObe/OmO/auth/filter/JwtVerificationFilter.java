package com.OmObe.OmO.auth.filter;

import com.OmObe.OmO.auth.jwt.JwtTokenizer;
import com.OmObe.OmO.auth.utils.ErrorResponder;
import com.OmObe.OmO.auth.utils.MemberAuthorityUtils;
import com.OmObe.OmO.exception.BusinessLogicException;
import com.OmObe.OmO.exception.ExceptionCode;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.SignatureException;
import java.util.List;
import java.util.Map;

// jwt 검증 필터
@Slf4j
@RequiredArgsConstructor
public class JwtVerificationFilter extends OncePerRequestFilter { // request 당 한 번만 실행되는 Security Filter
    private final JwtTokenizer jwtTokenizer;
    private final MemberAuthorityUtils authorityUtils;
    private final RedisTemplate redisTemplate;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("# JwtVerificationFilter");

//        if (checkResponseMethodURI(request)) { // 토큰이 필요없는 요청인지 확인
//            filterChain.doFilter(request, response);
//            return;
//        }

        String accessToken = request.getHeader("Authorization").replace("Bearer ", "");
        String isLogout = (String) redisTemplate.opsForValue().get(accessToken);

        if (!StringUtils.isEmpty(isLogout)) { // redis에 AccessToken이 있다면 로그아웃된 토큰이므로 예외처리
            log.info("# Invalid Token");
            throw new UnsupportedJwtException("Invalid Token!");
        }

        try{
            Map<String, Object> claims = verifyJws(request); // jwt 검증
            setAuthenticationToContext(claims); // Authentication 객체 SecurityContext에 저장
        } catch (ExpiredJwtException ee) {
            // 액세스 토큰이 만료된 경우
            log.info("catch ExpiredJwtException");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Access-Token expired");
            request.setAttribute("exception", ee);

        } catch (MalformedJwtException me) {
            // JWT 토큰이 형식에 맞지 않는 경우
            log.info("catch MalformedJwtException");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid Access-Token");
            request.setAttribute("exception", me);

        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response); // 다음 필터 호출
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer"); // Authorization header 값이 "Bearer"로 시작한 경우에 해당 필터 수행
    }

    // jwt 검증 메서드
    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", ""); // jwt 획득
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()); // secret key 추출
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody(); // claims 파싱(검증에 성공)

        return claims;
    }

    // Authentication 객체 SecurityContext에 저장하는 메서드
    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username = (String) claims.get("username"); // username
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List) claims.get("roles")); // 권한 정보 기반으로 List<GrantedAuthority> 생성
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);// 위 정보를 포함한 Authentication 객체 생성
        SecurityContextHolder.getContext().setAuthentication(authentication); // SecurityContext에 Authentication 객체 저장
    }
}
