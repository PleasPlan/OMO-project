package com.OmObe.OmO.Liked.entity;

import com.OmObe.OmO.Board.entity.Board;
import com.OmObe.OmO.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class Liked {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long likedId;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn
    private Member member;

    public void addMember(Member member){
        this.member = member;
    }

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn
    private Board board;

    public void addBoard(Board board){
        this.board = board;
    }
}
