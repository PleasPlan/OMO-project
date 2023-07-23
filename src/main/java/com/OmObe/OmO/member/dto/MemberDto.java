package com.OmObe.OmO.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

public class MemberDto {
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Post{
        @NotBlank(message = "이메일을 입력하세요.")
        @Email(message = "유효한 이메일 주소를 입력하세요.")
        private String email; // 이메일

        @NotBlank
        private String nickname; // 닉네임

        @NotBlank(message = "비밀번호를 입력하세요.")
        private String password; // 비밀번호

        @NotNull
        private int birthYear; // 생년월일 - 년

        @NotNull
        private int birthMonth; // 생년월일 - 월

        @NotNull
        private int birthDay; // 생년월일 - 일

        @NotNull(message = "mbti 유형을 입력하세요.")
        private int mbti; // mbti 유형

        @NotNull(message = "성별을 선택하세요.")
        private int gender; // 성별

//        @NotNull(message = "이용약관에 동의하세요.")
        private Boolean clause;


    }
}
