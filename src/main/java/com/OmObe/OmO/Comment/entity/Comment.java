package com.OmObe.OmO.Comment.entity;

import com.OmObe.OmO.Board.entity.Board;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

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

    @ManyToOne
    @JoinColumn(name = "BOARD_ID")
    private Board board;

//    @ManyToOne
//    @JoinColumn(name = "MEMBER_ID")
//    private Member member; // 댓글 작성자
}
