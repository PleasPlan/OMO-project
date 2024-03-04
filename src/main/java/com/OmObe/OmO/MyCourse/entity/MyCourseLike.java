package com.OmObe.OmO.MyCourse.entity;

import com.OmObe.OmO.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class MyCourseLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long myCourseLikeId;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn
    private MyCourse myCourse;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn
    private Member member;
}
