package com.OmObe.OmO.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter
@NoArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, unique = true)
    private String email; // 이메일

    @Column(length = 300, nullable = false)
    private String password; // 비밀번호

    @Column(nullable = false)
    private LocalDateTime birth; // 생년월일

    @Column(length = 30, nullable = false, unique = true)
    private String nickname; // 닉네임

    @Column(nullable = false)
    private int mbit; // mbti 유형

    @Column(nullable = false)
    private int gender; // 성별

    @Column(nullable = false)
    private Boolean clause; // 이용약관 동의 여부

    @Column
    private String profileImageUrl; // 프로필 이미지 url

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE; // 회원 상태 -> 기본값은 활동 상태

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Role role; // 회원 권한(일반 회원 / 관리자)

    // 회원 권한(일반 / 관리자)
    public enum Role{
        MEMBER("일반 회원"),
        ADMIN("관리자");

        @Getter
        private String roleStatus;

        Role(String roleStatus) {
            this.roleStatus = roleStatus;
        }
    }

    // 회원 상태(활동 / 탈퇴)
    public enum MemberStatus{
        MEMBER_ACTIVE("활동"),
        MEMBER_QUIT("탈퇴");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }
}
