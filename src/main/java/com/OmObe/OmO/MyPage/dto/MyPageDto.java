package com.OmObe.OmO.MyPage.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class MyPageDto {
    @Getter
    @AllArgsConstructor
    public static class Response{
        private long placeId;
        private String placeName;
    }
}
