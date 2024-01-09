package com.OmObe.OmO.notice.entity;

import com.OmObe.OmO.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Notice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noticeId; // 공지사항 고유 id

    @Column(nullable = false)
    private String type; // 공지사항 타입(일반 공지 / 점검)

    @Column(nullable = false)
    private String title; // 공지사항 제목

    @Column(nullable = false)
    private String content; // 공지 내용

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now(); // 공지사항 작성 시간

    @Column(nullable = false)
    private LocalDateTime modifiedAt = LocalDateTime.now(); // 공지사항 수정 시간

    @ManyToOne // Notice -Member 다대일 매핑
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
