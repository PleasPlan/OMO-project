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

    /**
     * <공지사항 수정>
     * 1. 게시글 존재 여부 검증
     * 2. 게시글 작성자와 수정자 비교
     * 3. 수정
     */
    public Notice patchNotice(NoticeDto.Patch patch, Long noticeId) {
        patch.setNoticeId(noticeId);
        Notice notice = mapper.noticePatchDtoToNotice(patch);

        // 1. 게시글 존재 여부 검증
        Notice checkedNotice = verifyNotice(notice.getNoticeId());
        checkedNotice.setModifiedAt(LocalDateTime.now());

        // 2. 게시글 작성자와 수정자 비교
        memberService.verifiedAuthenticatedMember(checkedNotice.getMember().getMemberId());

        // 3. 수정
        Optional.ofNullable(notice.getTitle()) // 제목
                .ifPresent(checkedNotice::setTitle);

        Optional.ofNullable(notice.getContent()) // 내용
                .ifPresent(checkedNotice::setContent);

        Optional.ofNullable(notice.getType()) // 공지 구분
                .ifPresent(checkedNotice::setType);

        return noticeRepository.save(checkedNotice);
    }

    // 게시글 존재 검증 메서드
    private Notice verifyNotice(Long noticeId) {
        Optional<Notice> optionalNotice = noticeRepository.findById(noticeId);

        return optionalNotice.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.NOTICE_NOT_FOUND));
    }
}
