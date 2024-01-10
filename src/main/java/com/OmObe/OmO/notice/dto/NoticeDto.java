package com.OmObe.OmO.notice.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.time.LocalDateTime;

// Notice Dto 클래스
public class NoticeDto {
    @AllArgsConstructor
    @Getter
    @Setter
    @NoArgsConstructor
    public static class Post{ // 공지 사항 작성 DTO
        @NotBlank(message = "제목을 입력하세요.")
        private String title; // 제목

        @NotBlank(message = "내용을 입력하세요.")
        private String content; // 내용

        /*
        <점검 타입>
        NOR : 일반 공지
        CHK : 점검 공지
         */
        @NotBlank(message = "공지사항의 종류를 선택하세요.")
        @Pattern(regexp = "^NOR|CHK$")
        private String type; // 공지 타입(일반 공지 / 점검 공지)
    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch{ // 공지 사항 수정 DTO
        private Long noticeId;

        private String title;

        private String content;

        @Pattern(regexp = "^NOR|CHK$")
        private String type;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor
    @Setter
    public static class Response{ // 공지 사항 응답 DTO
        private Long noticeId;
        private String title;
        private String content;
        private String type;
        private LocalDateTime createdAt;
    }
}
