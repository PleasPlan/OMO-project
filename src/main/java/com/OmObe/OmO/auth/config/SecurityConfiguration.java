package com.OmObe.OmO.auth.config;

import com.OmObe.OmO.auth.filter.JwtAuthenticationFilter;
import com.OmObe.OmO.auth.filter.JwtVerificationFilter;
import com.OmObe.OmO.auth.handler.MemberAuthenticationFailureHandler;
import com.OmObe.OmO.auth.handler.MemberAuthenticationSuccessHandler;
import com.OmObe.OmO.auth.jwt.JwtTokenizer;
import com.OmObe.OmO.auth.utils.MemberAuthorityUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
public class SecurityConfiguration {
    private final JwtTokenizer jwtTokenizer;
    private final MemberAuthorityUtils authorityUtils;

    public SecurityConfiguration(JwtTokenizer jwtTokenizer, MemberAuthorityUtils authorityUtils) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
    }

    // http 요청에 대한 보안 설정 구성
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin() // 동일 출처로부터 들어오는 request만 페이지 렌더링 허용
                .and()
                .csrf().disable() // csrf 공격에 대한 보호 비활성화
                .cors(Customizer.withDefaults()) // cors 설정
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션 생성X
                .and()
                .formLogin().disable() // 폼 로그인 방식 비활성화
                .httpBasic().disable() // HTTP 기본 인증 비활성화
                .apply(new CustomFilterConfigurer()) // jwt 로그인 인증
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers("/signup").permitAll()
                        .antMatchers("/members/{memberId}").permitAll());

        return http.build();
    }

    // 패스워드 암호화 기능
    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // CORS 정책 설정
    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*")); // 모든 origin에 대해 http 통신 허용
        configuration.setAllowedMethods(Arrays.asList("GET","POST","PATCH", "DELETE")); // 허용하는 http 메서드

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    // JwtAuthenticationFilter 등록
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authentic = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authentic, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/login");
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }
}
