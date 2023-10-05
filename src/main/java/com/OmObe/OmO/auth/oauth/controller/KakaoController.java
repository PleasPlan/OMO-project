package com.OmObe.OmO.auth.oauth.controller;

import com.OmObe.OmO.auth.handler.OAuth2MemberSuccessHandler;
import com.OmObe.OmO.auth.jwt.TokenService;
import com.OmObe.OmO.auth.oauth.dto.KakaoProfile;
import com.OmObe.OmO.auth.oauth.dto.OAuthToken;
import com.OmObe.OmO.auth.oauth.service.KakaoOAuthService;
import com.OmObe.OmO.auth.oauth.service.OAuth2MemberService;
import com.OmObe.OmO.auth.utils.MemberAuthorityUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
public class KakaoController {
    private final KakaoOAuthService kakaoOAuthService;
    private final MemberAuthorityUtils authorityUtils;
    private final OAuth2MemberService oAuth2MemberService;
    private final TokenService tokenService;

    @GetMapping("/auth/kakao/callback")
    public ResponseEntity kakaoCallback(@RequestParam("code") String code, HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException{
        OAuthToken oAuthToken = kakaoOAuthService.tokenRequest(code); // 토큰 획득
        log.info("code : {}", code);

        KakaoProfile kakaoProfile = kakaoOAuthService.userInfoRequest(oAuthToken); // 사용자 정보 획득

        Map<String, Object> attributes = new HashMap<>();
        attributes.put("id", kakaoProfile.getId());
        attributes.put("email", kakaoProfile.getKakao_account().getEmail());
        attributes.put("profileImage", kakaoProfile.getProperties().getProfile_image());

        OAuth2User oAuth2User = new DefaultOAuth2User(
                Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")),
                attributes,
                "id"
        );

        Authentication authentication = new OAuth2AuthenticationToken(oAuth2User, Collections.emptyList(), "kakao");

        AuthenticationSuccessHandler successHandler = new OAuth2MemberSuccessHandler(tokenService, oAuth2MemberService, authorityUtils);
        successHandler.onAuthenticationSuccess(request, response, authentication);

        return new ResponseEntity(HttpStatus.OK);

    }
}
