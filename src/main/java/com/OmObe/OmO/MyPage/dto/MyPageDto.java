package com.OmObe.OmO.MyPage.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class MyPageDto {
    @Getter
    @AllArgsConstructor
    public static class Response{
        private long placeId;
        private String placeName;
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class PlaceList{
        private List<String> placeNameList;
        private List<Long> placeIdList;
    }
}
