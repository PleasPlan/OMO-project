package com.OmObe.OmO.auth.oauth.controller;

import com.OmObe.OmO.auth.jwt.TokenService;
import com.OmObe.OmO.member.dto.MemberDto;
import com.OmObe.OmO.member.entity.Member;
import com.OmObe.OmO.member.mapper.MemberMapper;
import com.OmObe.OmO.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@Slf4j
public class OAuthController {
    private final MemberMapper mapper;
    private final MemberService memberService;

    /*
    oauth 서비스에서 "https://accounts.google.com/*" 엔드포인트에 대한 CORS를 지원하지 않아
    브라우저에서 oauth 로그인하는 출처에 직접 접근 시 CORS 문제 발생
    todo: 프론트엔드와 테스트 후 사용 여부 결정
     */
//    @GetMapping("/api/login/{oauth}")
//    public RedirectView oAuthLoginController(@PathVariable("oauth") String oauth) {
//        RedirectView redirectView = new RedirectView();
//
//        redirectView.setUrl("https://api.oneulmohae.co.kr/oauth2/authorization/" + oauth);
//        return redirectView;
//    }

    /*
    <OAuth2 로그인 성공 후 헤더에 access token, refresh token 설정>
    OAuth2 로그인을 통해 얻은 access token과 refresh token은 OAuth2를 제공하는 서비스 자원에 접근할 수 있는 토큰이다.
    해당 애플리케이션에 접근 가능한 권한을 주기 위해서는 헤더에 access token과 refresh token을 설정한다.
     */
    @GetMapping("/api/login/oauth")
    public ResponseEntity oAuthLoginSuccessController(HttpServletRequest request,
                                                      HttpServletResponse response,
                                                      @RequestParam("accessToken") String accessToken,
                                                      @RequestParam("refreshToken") String refreshToken) {

//        String token = accessToken.substring(7); // 액세스 토큰 추출
//        Member member = memberService.jwtTokenToMember(token); // 토큰을 통해 인증된 member를 추출
//        MemberDto.Response dto = mapper.memberToMemberResponseDto(member);

        // access token, refresh token을 헤더에 설정
        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);

        log.info("accessToken : {}", response.getHeader("Authorization"));
        log.info("refreshToken : {}", response.getHeader("Refresh"));

        return new ResponseEntity(HttpStatus.OK);

    }
}
