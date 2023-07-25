package com.OmObe.OmO.member.service;

import com.OmObe.OmO.exception.BusinessLogicException;
import com.OmObe.OmO.exception.ExceptionCode;
import com.OmObe.OmO.member.entity.Member;
import com.OmObe.OmO.member.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
@Slf4j
public class MemberService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    /**
     * <회원 가입>
     * Spring Security와 jwt 구현 후 수정 예정
     * 1. 이메일 중복 확인
     * 2. 닉네임 중복 확인
     * 3. 회원 상태를 활동 중으로 설정
     * 4. 입력받은 생년월일 저장
     * 5. 패스워드 암호화
     * 6. 1~5번의 절차가 모두 완료되면 회원 데이터 저장
     */
    public Member createMember(Member member){
        // 1. 이메일 중복 확인
        verifyExistsEmail(member.getEmail());

        // 2. 닉네임 중복 확인
        verifyExistsNickname(member.getNickname());

        // 3. 회원 상태를 활동 중으로 설정
        member.setMemberStatus(Member.MemberStatus.MEMBER_ACTIVE);

        // 4. 입력받은 생년월일 저장
        member.setBirth(LocalDate.of(member.getBirthYear(), member.getBirthMonth(), member.getBirthDay()));
        log.info("birth : {}", member.getBirth());

        // 5. 패스워드 암호화
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        // 6. 1~5번의 절차가 모두 완료되면 회원 데이터 저장
        Member savedMember = memberRepository.save(member);

        return savedMember;
    }

    /**
     * <회원 탈퇴>
     * 1. 탈퇴하려는 회원이 존재하는 회원인지 검증
     * 2. 회원의 상태를 MEMBER_ACTIVE에서 MEMBER_QUIT로 변경
     * 3. 변경사항 저장
     */
    public Member quitMember(Long memberId){
        // 1. 탈퇴하려는 회원이 존재하는 회원인지 검증
        Member findMember = findVerifiedMember(memberId);

        // 2. 회원의 상태를 MEMBER_ACTIVE에서 MEMBER_QUIT로 변경
        findMember.setMemberStatus(Member.MemberStatus.MEMBER_QUIT);

        // 3. 변경사항 저장
        return memberRepository.save(findMember);
    }

    // 이메일 중복 검증 메서드
    public void verifyExistsEmail(String email){
        Optional<Member> member = memberRepository.findByEmail(email);

        if (member.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.EMAIL_ALREADY_EXIST);
        }
    }

    // 닉네임 중복 검증 메서드
    public void verifyExistsNickname(String nickname){
        Optional<Member> member = memberRepository.findByNickname(nickname);

        if (member.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.NICKNAME_ALREADY_EXIST);
        }
    }

    // 회원 존재 여부 검증 메서드
    public Member findVerifiedMember(Long memberId){
        Optional<Member> optionalMember = memberRepository.findById(memberId);
        Member findMember = optionalMember.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findMember;
    }


}
