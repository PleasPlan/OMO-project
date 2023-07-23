package com.OmObe.OmO.member.service;

import com.OmObe.OmO.member.entity.Member;
import com.OmObe.OmO.member.mapper.MemberMapper;
import com.OmObe.OmO.member.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;

    @Autowired
    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    /**
     * <회원 가입>
     * Spring Security와 jwt 구현 후 수정 예정
     * 1. 이메일 중복 확인
     * 2. 닉네임 중복 확인
     * 3. 회원 상태를 활동 중으로 설정
     * 4. 입력받은 생년월일 저장
     * 5. 1~4번의 절차가 모두 완료되면 회원 데이터 저장
     */
    public Member createMember(Member member) throws Exception { // 예외 처리 객체를 생성해 예외처리 (변경 예정)
        // 1. 이메일 중복 확인
        verifyExistsEmail(member.getEmail());

        // 2. 닉네임 중복 확인
        verifyExistsNickname(member.getNickname());

        // 3. 회원 상태를 활동 중으로 설정
        member.setMemberStatus(Member.MemberStatus.MEMBER_ACTIVE);

        // 4. 입력받은 생년월일 저장
        member.setBirth(LocalDate.of(member.getBirthYear(), member.getBirthMonth(), member.getBirthDay()));
        log.info("birth : {}", member.getBirth());

        // 5. 1~4번의 절차가 모두 완료되면 회원 데이터 저장
        Member savedMember = memberRepository.save(member);

        return savedMember;
    }

    // 이메일 중복 검증 메서드
    public void verifyExistsEmail(String email) throws Exception { // 예외 처리 객체를 생성해 예외처리 (변경 예정)
        Optional<Member> member = memberRepository.findByEmail(email);

        if (member.isPresent()) {
            throw new Exception("이미 존재하는 이메일");
        }
    }

    // 닉네임 중복 검증 메서드
    public void verifyExistsNickname(String nickname) throws Exception { // 예외 처리 객체를 생성해 예외처리 (변경 예정)
        Optional<Member> member = memberRepository.findByNickname(nickname);

        if (member.isPresent()) {
            throw new Exception("이미 존재하는 닉네임");
        }
    }
}
