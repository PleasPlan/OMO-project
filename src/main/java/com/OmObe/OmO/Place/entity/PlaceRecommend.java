package com.OmObe.OmO.Place.entity;

import com.OmObe.OmO.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class PlaceRecommend {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long placeRecommendId;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn
    private Member member;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn
    private Place place;
}
