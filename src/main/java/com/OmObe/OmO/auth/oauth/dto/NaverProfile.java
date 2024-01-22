package com.OmObe.OmO.auth.oauth.dto;

import lombok.Data;

@Data
public class NaverProfile {
    private String resultcode; // api 호출 결과 코드
    private String message; // 호출 결과 메시지
    private Response response;

    @Data
    public static class Response{
        private String id;
        private String nickname;
        private String name;
        private String email;
        private String gender;
        private String age;
        private String birthday;
        private String profile_image;
        private String birthyear;
        private String mobile;
    }
}
