package com.OmObe.OmO.notice.entity;

import com.OmObe.OmO.member.entity.Member;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
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

    @Column(updatable = false, name = "CREATED_AT")
    private LocalDateTime createdAt = LocalDateTime.now(); // 공지사항 작성 시간

    @Column(name = "MODIFIED_AT")
    private LocalDateTime modifiedAt = LocalDateTime.now(); // 공지사항 수정 시간

    @ManyToOne // Notice -Member 다대일 매핑
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setType(String type) {
        this.type = type;
    }

    public void setMember(Member member) {
        this.member = member;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
