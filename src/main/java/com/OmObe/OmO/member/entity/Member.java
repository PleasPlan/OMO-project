package com.OmObe.OmO.member.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.time.LocalDate;

/**
 * 프로필 이미지, 사용자 권한은 security 적용 후 구현할 예정
 */
@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, unique = true)
    private String email; // 이메일

    @Column(length = 300, nullable = false)
    private String password; // 비밀번호

    @Column(nullable = false)
    private int birthYear; // 생년월일 - 년

    @Column(nullable = false)
    @Max(12)
    @Min(1)
    private int birthMonth; // 생년월일 - 월

    @Column(nullable = false)
    @Max(31)
    @Min(1)
    private int birthDay; // 생년월일 - 일

    @Column//(nullable = false)
    private LocalDate birth; // 생년월일

    @Column(length = 30, nullable = false, unique = true)
    private String nickname; // 닉네임

    @Column(nullable = false)
    private int mbit; // mbti 유형

    @Column(nullable = false)
    private int gender; // 성별

    @Column(nullable = false)
    private Boolean clause; // 이용약관 동의 여부

//    @Column
//    private String profileImageUrl; // 프로필 이미지 url

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE; // 회원 상태 -> 기본값은 활동 상태

//    @Enumerated(value = EnumType.STRING)
//    @Column(nullable = false)
//    private Role role = Role.MEMBER; // 회원 권한(일반 회원 / 관리자)

//    public void setMemberId(Long memberId) {
//        this.memberId = memberId;
//    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setBirth(LocalDate birth) {
        this.birth = birth;
    }

    public void setBirthYear(int birthYear) {
        this.birthYear = birthYear;
    }

    public void setBirthMonth(int birthMonth) {
        this.birthMonth = birthMonth;
    }

    public void setBirthDay(int birthDay) {
        this.birthDay = birthDay;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public void setMbit(int mbit) {
        this.mbit = mbit;
    }

    public void setGender(int gender) {
        this.gender = gender;
    }

    public void setClause(Boolean clause) {
        this.clause = clause;
    }

//    public void setProfileImageUrl(String profileImageUrl) {
//        this.profileImageUrl = profileImageUrl;
//    }

    public void setMemberStatus(MemberStatus memberStatus) {
        this.memberStatus = memberStatus;
    }

//    public void setRole(Role role) {
//        this.role = role;
//    }
//
//    // 회원 권한(일반 / 관리자)
//    public enum Role{
//        MEMBER("일반 회원"),
//        ADMIN("관리자");
//
//        @Getter
//        private String roleStatus;
//
//        Role(String roleStatus) {
//            this.roleStatus = roleStatus;
//        }
//    }

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
