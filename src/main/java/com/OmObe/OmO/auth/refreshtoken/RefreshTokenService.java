package com.OmObe.OmO.auth.refreshtoken;

import com.OmObe.OmO.auth.jwt.JwtTokenizer;
import com.OmObe.OmO.auth.jwt.TokenService;
import com.OmObe.OmO.exception.BusinessLogicException;
import com.OmObe.OmO.exception.ExceptionCode;
import com.OmObe.OmO.member.entity.Member;
import com.OmObe.OmO.member.repository.MemberRepository;
import com.OmObe.OmO.redis.RedisService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor

public class RefreshTokenService {
    private final RedisTemplate<String, String> redisTemplate;
    private final RedisService redisService;
    private final JwtTokenizer jwtTokenizer;
    private final TokenService tokenService;
    private final MemberRepository memberRepository;

    /**
     * <리프레시 토큰을 이용한 액세스 토큰 재발급>
     * 1. 액세스 토큰 재발급 요청에 담긴 리프레시 토큰을 통해 회원의 이메일 추출
     * 2. 추출한 이메일의 회원의 리프레시 토큰이 redis에 저장되어 있는지 확인
     *  2-1. 저장되어 있으면 3번 과정 진행
     *  2-2. redis에 없으면 예외 처리 후 종료
     * 3. 새로운 액세스 토큰 발급 후 기존 저장되어 있던 리프레시 토큰은 redis에서 제거
     */
    public String reissueToken(String refreshToken) {
        // 1. 액세스 토큰 재발급 요청에 담긴 리프레시 토큰을 통해 회원의 이메일 추출
        Jws<Claims> claims = jwtTokenizer.getClaims(refreshToken, jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey()));
        String email = claims.getBody().getSubject();

        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        // 2. 추출한 이메일의 회원의 리프레시 토큰이 redis에 저장되어 있는지 확인
        if (Boolean.TRUE.equals(redisTemplate.hasKey(email)) && optionalMember.isPresent()) {
            // 2-1. 저장되어 있으면 3번 과정 진행
            Member member = optionalMember.get();
            String accessToken = tokenService.delegateAccessToken(member);

            // 3. 새로운 액세스 토큰 발급 후 기존 저장되어 있던 리프레시 토큰은 redis에서 제거
            redisTemplate.delete(email);
            return accessToken;

            // 2-2. redis에 없으면 예외 처리 후 종료
        } else throw new BusinessLogicException(ExceptionCode.INVALID_TOKEN);
    }
}
