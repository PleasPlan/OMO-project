package com.OmObe.OmO.auth.handler;

import com.OmObe.OmO.auth.jwt.TokenService;
import com.OmObe.OmO.auth.oauth.service.OAuth2MemberService;
import com.OmObe.OmO.auth.utils.MemberAuthorityUtils;
import com.OmObe.OmO.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
// Oauth2인증이 성공적으로 수행되면 호출되는 핸들러
public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final TokenService tokenService;
    private final OAuth2MemberService oAuth2MemberService;
    private final MemberAuthorityUtils authorityUtils;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {
        var oAuth2User = (OAuth2User)authentication.getPrincipal(); // authentication 객체에서 OAuth2 사용자 정보를 추출
        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        List<String> authorities = authorityUtils.createRoles(email);

        Member member = oAuth2MemberService.createOAuth2Member(oAuth2User); // OAuth2 사용자 정보 저장

        redirect(request, response, member); // Oauth2 사용자의 정보를 Member에 맞게 매핑하고 파라미터에 member 추가 예정

    }

    // 토큰 생성 후 리다이렉트
    private void redirect(HttpServletRequest request, HttpServletResponse response, Member member) throws IOException {
        String accessToken = tokenService.delegateAccessToken(member);
        String refreshToken = tokenService.delegateRefreshToken(member);

        String uri = createURI(accessToken, refreshToken).toString(); // 리다이렉트할 url
        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private URI createURI(String accessToken, String refreshToken) {
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("accessToken", "Bearer " + accessToken);
        queryParams.add("refreshToken", refreshToken);

        return UriComponentsBuilder
                .newInstance()
                .scheme("http")
                .host("localhost") // 애플리케이션 배포 후 변경 예정
                .port(8080)
//                .port(3000)
                .path("/login/oauth")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}
