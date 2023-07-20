package com.OmObe.OmO.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class MemberDto {
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    public static class Post{
        @NotBlank(message = "이메일을 입력하세요.")
        @Email(message = "유효한 이메일 주소를 입력하세요.")
        private String email; // 이메일

        @NotBlank(message = "비밀번호를 입력하세요.")
        private String password; // 비밀번호

        @NotBlank(message = "생년월일을 입력하세요.")
        private LocalDateTime birth; // 생년월일

        @NotBlank(message = "mbti 유형을 입력하세요.")
        private int mbti; // mbti 유형

        @NotBlank(message = "성별을 선택하세요.")
        private int gender; // 성별

        @NotBlank(message = "이용약관에 동의하세요.")
        private Boolean clause;
    }
}
