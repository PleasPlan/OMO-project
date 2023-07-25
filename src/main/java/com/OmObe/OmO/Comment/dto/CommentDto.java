package com.OmObe.OmO.Comment.dto;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CommentDto {

    public static class Post{
        private long BoardId;
        @NotBlank(message = "내용을 입력해주세요.")
        private String content;
    }

    public static class Patch{
        private long commentId;
        private String content;
    }

    public static class Response{
        private long commentId;
        private String writer;
        private String profileURL;
        private String content;
    }
}
