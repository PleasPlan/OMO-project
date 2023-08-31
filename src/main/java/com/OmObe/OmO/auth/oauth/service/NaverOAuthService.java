package com.OmObe.OmO.auth.oauth.service;

import com.OmObe.OmO.auth.oauth.dto.NaverProfile;
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
public class NaverOAuthService {
    @Value("${spring.security.oauth2.client.registration.naver.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.naver.client-secret}")
    private String clientSecret;

    // 네이버 api 통해 액세스 토큰 요청
    public OAuthToken tokenRequest(String code) {
        RestTemplate restTemplate = new RestTemplate();

        // Http Header 설정
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // Http Body 설정
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", clientId);
        body.add("client_secret", clientSecret);
        body.add("redirect_uri", "http://localhost:8080/auth/naver/callback");
        body.add("code", code);

        // HttpHeader와 HttpBody로 액세스 토큰 요청하는 객체 생성
        HttpEntity<MultiValueMap<String, String>> naverTokenRequest = new HttpEntity<>(body, headers);

        // naver api 엔드포인트를 통해 액세스 토큰 요청을 보내고 응답을 받음
        return restTemplate.exchange(
                "https://nid.naver.com/oauth2.0/token",
                HttpMethod.POST,
                naverTokenRequest,
                OAuthToken.class
                ).getBody();
    }

    // naver api로 사용자의 정보 요청
    public NaverProfile userInfoRequest(OAuthToken oAuthToken) {
        RestTemplate restTemplate = new RestTemplate();

        // Http Header 설정
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add("Authorization", "Bearer " + oAuthToken.getAccess_token());
        httpHeaders.add("Content_type", "application/x-www-form-urlencoded;charset=utf-8");

        // HttpHeader와 HttpBody로 액세스 토큰 요청하는 객체 생성
        HttpEntity<MultiValueMap<String, String>> naverProfileRequest = new HttpEntity<>(httpHeaders);

        // naver api 엔드포인트를 통해 액세스 토큰 요청을 보내고 응답을 받음
        return restTemplate.exchange(
                "https://openapi.naver.com/v1/nid/me",
                HttpMethod.POST,
                naverProfileRequest,
                NaverProfile.class
                ).getBody();
    }
}
