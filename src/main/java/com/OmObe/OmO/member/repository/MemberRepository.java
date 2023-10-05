package com.OmObe.OmO.member.repository;

import com.OmObe.OmO.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    // 이메일을 통한 회원 조회
    Optional<Member> findByEmail(String email);

    // 닉네임을 통한 회원 조회
    Optional<Member> findByNickname(String nickname);
}
