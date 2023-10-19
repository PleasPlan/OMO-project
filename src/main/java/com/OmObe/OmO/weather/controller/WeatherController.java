package com.OmObe.OmO.weather.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/weather")
@RequiredArgsConstructor
public class WeatherController {

    @Value("${spring.openweatherAPI.key}")
    private String key; // openWeatherAPI key

    @GetMapping("/forecast")
    public String callLocalWeather(@RequestParam double lat, @RequestParam double lon) {
        Mono<String> mono = WebClient.builder().baseUrl("http://api.openweathermap.org")
                .build().get()
                .uri(builder -> builder.path("/data/2.5/forecast")
                        .queryParam("lat", lat) // 위도
                        .queryParam("lon", lon) // 경도
                        .queryParam("appid", key)
                        .queryParam("units", "metric") // 섭씨 온도를 기준 단위로 설정
                        .queryParam("lang", "kr") // 한국어 설정
                        .build())
                .exchangeToMono(response -> {
                    return response.bodyToMono(String.class);
                });

        return mono.block();
    }
}
