package com.OmObe.OmO.auth.oauth.service;

import com.OmObe.OmO.auth.oauth.dto.KakaoProfile;
import com.OmObe.OmO.auth.oauth.dto.OAuthToken;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@Slf4j
public class KakaoOAuthService {

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String clientSecret;

    // 카카오 api 통해 액세스 토큰 요청
    public OAuthToken tokenRequest(String code) {
        log.info("clientId : {}", clientId);

        // TODO : RestTemplate은 Spring 5.0 이후 deprecated되었기 때문에 Webclient를 이용한 코드로 변경할 것
        RestTemplate restTemplate = new RestTemplate();

        // Http Header 설정
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // Http Body 설정
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", clientId);
        body.add("client_secret", clientSecret);
        body.add("redirect_uri", "http://localhost:8080/auth/kakao/callback");
        body.add("code", code);

        // Http Header와 Http Body를 통해 http 요청 객체 생성
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(body, headers);

        // kakao api 엔드포인트를 통해 액세스 토큰 요청을 보내고 응답을 받음
        return restTemplate.exchange("https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                OAuthToken.class)
                .getBody();
    }

    // kakao api로 사용자의 정보 요청
    public KakaoProfile userInfoRequest(OAuthToken oAuthToken) {
        RestTemplate restTemplate = new RestTemplate();

        // Http Header 설정
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + oAuthToken.getAccess_token());
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        // Http Header와 Http Body를 통해 http 요청 객체 생성
        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest = new HttpEntity<>(headers);

        // kakao api 엔드포인트를 통해 액세스 토큰 요청을 보내고 응답을 받음
        return restTemplate.exchange("https://kapi.kakao.com/v2/user/me",
                        HttpMethod.POST,
                        kakaoProfileRequest,
                        KakaoProfile.class)
                        .getBody();
    }


}
