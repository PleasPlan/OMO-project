package com.OmObe.OmO.auth.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfiguration {
    // http 요청에 대한 보안 설정 구성
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin() // 동일 출처로부터 들어오는 request만 페이지 렌더링 허용
                .and()
                .csrf().disable() // csrf 공격에 대한 보호 비활성화
                .formLogin().disable() // 폼 로그인 방식 비활성화
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers("/signup").permitAll()
                        .antMatchers("/members/{memberId}").permitAll());
                // 추가 예정

        return http.build();
    }

    // 패스워드 암호화 기능
    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }
}
