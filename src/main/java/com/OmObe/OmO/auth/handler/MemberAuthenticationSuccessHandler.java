package com.OmObe.OmO.auth.handler;

import com.google.gson.JsonObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;

@Slf4j
public class MemberAuthenticationSuccessHandler implements AuthenticationSuccessHandler { // 로그인 성공 시 처리 로직
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException{
        // 사용자 정보(memberId) json 형식으로 리턴
        String memberId = response.getHeader("memberId");

        try (PrintWriter writer = response.getWriter()) {
            JsonObject json = new JsonObject();
            json.addProperty("memberId", memberId);
            response.setStatus(HttpStatus.ACCEPTED.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setCharacterEncoding(StandardCharsets.UTF_8.toString());

            writer.write(json.toString());
        }
        log.info("# Authenticated successfully");
    }
}
