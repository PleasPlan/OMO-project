package com.OmObe.OmO.MyCourse.entity;

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
public class MyCourse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long courseId;

    @Column
    private String courseName;

    @Column
    private String placeName;

    @Column
    private long placeId;

    @Column
    private LocalDateTime times;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime modifiedAt = LocalDateTime.now();

    @Column(nullable = false)
    private Integer viewCount = 0;

    @ManyToOne
    @JoinColumn(name = "WRITER")
    private Member member;

    @OneToOne
    private MyCourse nextCourse;
}
