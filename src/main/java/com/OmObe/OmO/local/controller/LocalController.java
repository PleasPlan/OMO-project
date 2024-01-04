package com.OmObe.OmO.local.controller;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/local")
@RequiredArgsConstructor
@Slf4j
public class LocalController { // 주소 검색을 위한 컨트롤러

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String clientId;

    // 지역 검색
    @GetMapping("/{location}")
    public String callLocalInfo(@PathVariable("location") String location) {
        Mono<String> mono = WebClient.builder().baseUrl("https://dapi.kakao.com")
                .build().get()
                .uri(builder -> builder.path("/v2/local/search/address.json")
                        .queryParam("query", location) // 검색어
                        .build())
                .header("Authorization", "KakaoAK " + clientId) // 헤더 설정
                .exchangeToMono(response -> {
                    return response.bodyToMono(String.class);
                });
        return mono.block();
    }
}
