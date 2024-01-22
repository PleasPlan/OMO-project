package com.OmObe.OmO.report.commentreport.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

public class CommentReportDto {
    @AllArgsConstructor
    @Getter
    @Setter
    @NoArgsConstructor
    public static class Post{
        @Min(1)
        @Max(6)
        private int reportType; // 신고 유형(1~6)

        private String reason; // 신고 사유(신고 유형이 6(기타)인 경우 필수 작성)
    }

    @AllArgsConstructor
    @Getter
    @Setter
    @NoArgsConstructor
    public static class Response{
        private Long commentReportId;
        private int reportType;
        private String reason;
    }
}
