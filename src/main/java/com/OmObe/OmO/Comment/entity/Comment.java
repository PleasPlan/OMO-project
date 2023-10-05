package com.OmObe.OmO.Comment.entity;

import com.OmObe.OmO.Board.entity.Board;
import com.OmObe.OmO.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentId; // 댓글 ID

    @Column()
    private String content; // 댓글 내용

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();    // 게시글 생성 일자

    @Column(nullable = false)
    private LocalDateTime modifiedAt = LocalDateTime.now();   // 게시글 최종 수정 일자

    @ManyToOne
    @JoinColumn(name = "BOARD_ID")
    private Board board;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member; // 댓글 작성자


}
