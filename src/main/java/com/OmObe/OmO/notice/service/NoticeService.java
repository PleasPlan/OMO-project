package com.OmObe.OmO.notice.service;

import com.OmObe.OmO.auth.jwt.TokenDecryption;
import com.OmObe.OmO.exception.BusinessLogicException;
import com.OmObe.OmO.exception.ExceptionCode;
import com.OmObe.OmO.member.entity.Member;
import com.OmObe.OmO.member.repository.MemberRepository;
import com.OmObe.OmO.member.service.MemberService;
import com.OmObe.OmO.notice.dto.NoticeDto;
import com.OmObe.OmO.notice.entity.Notice;
import com.OmObe.OmO.notice.mapper.NoticeMapper;
import com.OmObe.OmO.notice.repository.NoticeRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class NoticeService {
    private final TokenDecryption tokenDecryption;
    private final NoticeMapper mapper;
    private final NoticeRepository noticeRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    /**
     * <공지사항 등록>
     * 1. 회원 매핑
     * 2. 작성자 검증
     * 3. 공지사항 저장
     */
    public Notice createNotice(NoticeDto.Post post, String token) throws JsonProcessingException {
        Notice notice = mapper.noticePostDtoToNotice(post);
        // TODO : 작성 시간을 setter로 선언해야 정상적으로 db에 작성 시간이 저장됨 <수정 필요>
        notice.setCreatedAt(LocalDateTime.now());

        // 1. 회원 매핑
        try {
            Member member = tokenDecryption.getWriterInJWTToken(token);
            notice.setMember(member);
        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }

        // 2. 작성자 검증
        memberService.verifiedAuthenticatedMember(notice.getMember().getMemberId());

        // 3. 공자사항 저장
        return noticeRepository.save(notice);
    }
}
