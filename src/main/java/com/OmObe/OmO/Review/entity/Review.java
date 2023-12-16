package com.OmObe.OmO.Review.entity;

import com.OmObe.OmO.Place.entity.Place;
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
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long reviewId;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private String placeName;

    @Column
    private String imageAddress;

    @Column
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "WRITER")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "PLACE")
    private Place place;
}
