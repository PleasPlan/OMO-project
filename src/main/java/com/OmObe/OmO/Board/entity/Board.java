package com.OmObe.OmO.Board.entity;

import com.OmObe.OmO.Comment.entity.Comment;
import com.OmObe.OmO.Liked.entity.Liked;
import com.OmObe.OmO.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long boardId;   // 게시글 고유ID

    @Column
    private String type;

    @Column(nullable = false)
    private String title;   // 게시글 제목

    @Column(nullable = false)
    private String content;    // 게시글 내용

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();    // 게시글 생성 일자

    @Column(nullable = false)
    private LocalDateTime modifiedAt = LocalDateTime.now();   // 게시글 최종 수정 일자

    @Column(nullable = false)
    private Integer viewCount = 0;  // 게시글 조회수\

    @OneToMany(mappedBy = "board",cascade = CascadeType.PERSIST)
    private List<Liked> likes = new ArrayList<>();

    @OneToMany(mappedBy = "board",cascade = CascadeType.PERSIST)
    private List<Comment> comments = new ArrayList<>();

    @OneToOne(mappedBy = "board")
    private Member member;

    public void addLike(Liked liked){
        this.likes.add(liked);
        liked.setBoard(this);
    }

    public void addComment(Comment comment){
        this.comments.add(comment);
        comment.setBoard(this);
    }
}
