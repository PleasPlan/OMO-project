package com.OmObe.OmO.Board.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long boardId;   // 게시글 고유ID

    @Column(nullable = false)
    private String title;   // 게시글 제목

    @Column(nullable = false)
    private String content;    // 게시글 내용

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();    // 게시글 생성 일자

    @Column(nullable = false)
    private LocalDateTime modifiedAt = LocalDateTime.now();   // 게시글 최종 수정 일자

    @Column(nullable = false)
    private Integer viewCount = 0;  // 게시글 조회수

    // private Integer commentCount;   // 댓글 수(후에 comment 연관관계 맺으면 빼도 될 지도?)

    // private Integer likeCount;  // 좋아요 수(후에 like 연관관계 맺으면 빼도 될 지도?)

    //TODO : member랑 comment 연관관계 맺기
}
