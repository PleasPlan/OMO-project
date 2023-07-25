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

    @ManyToOne
    @JoinColumn
    private Member member;

    @OneToOne
    private Board board;
}
