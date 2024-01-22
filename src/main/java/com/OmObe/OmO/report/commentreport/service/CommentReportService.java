package com.OmObe.OmO.report.commentreport.service;

import com.OmObe.OmO.Comment.entity.Comment;
import com.OmObe.OmO.Comment.service.CommentService;
import com.OmObe.OmO.auth.jwt.TokenDecryption;
import com.OmObe.OmO.exception.BusinessLogicException;
import com.OmObe.OmO.exception.ExceptionCode;
import com.OmObe.OmO.member.entity.Member;
import com.OmObe.OmO.member.service.MemberService;
import com.OmObe.OmO.report.commentreport.dto.CommentReportDto;
import com.OmObe.OmO.report.commentreport.entity.CommentReport;
import com.OmObe.OmO.report.commentreport.mapper.CommentReportMapper;
import com.OmObe.OmO.report.commentreport.repository.CommentReportRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class CommentReportService {
    private final CommentReportRepository commentReportRepository;
    private final CommentReportMapper mapper;
    private final MemberService memberService;
    private final CommentService commentService;
    private final TokenDecryption tokenDecryption;

    /**
     * <댓글 신고>
     * 1. 댓글 검증(존재하는 댓글?)
     * 2. 신고 유형이 6(기타)인 경우 신고 사유 유무 파악
     * 3. 인증된 사용자와 댓글 정보를 commentReport 객체에 저장
     * 4. 신고 내용 저장
     */
    public CommentReport createCommentReport(CommentReportDto.Post post, String token, Long commentId) {
        // 1. 댓글 검증(존재하는 댓글?)
        Comment comment = commentService.findComment(commentId);

        // 2. 신고 유형이 6(기타)인 경우 신고 사유 유무 파악
        if (post.getReportType() == 6) {
            if (post.getReason().isBlank()) {
                throw new BusinessLogicException(ExceptionCode.REPORT_REASON_NOT_EXIST);
            }
        }

        // 3. 인증된 사용자와 댓글 정보를 commentReport 객체에 저장
        CommentReport commentReport = mapper.commentReportPostDtoToCommentReport(post);
        try {
            Member member = tokenDecryption.getWriterInJWTToken(token);
            memberService.verifiedAuthenticatedMember(member.getMemberId());
            commentReport.setMember(member);
        } catch (JsonProcessingException je) {
            throw new RuntimeException(je);
        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
        commentReport.setComment(comment);

        // 4. 신고 내용 저장
        return commentReportRepository.save(commentReport);
    }

    /**
     * <신고 내용 조회>
     * 1. 먼저 신고된 순으로 조회(과거순)
     */
    public Page<CommentReport> getCommentReports(int page, int size) {
        // 1. 먼저 신고된 순으로 조회(과거순)
        return commentReportRepository.findAll(reportSortedBy(page, size));
    }

    // 신고 내용 목록을 과거순으로 조회
    private Pageable reportSortedBy(int page, int size) {
        return PageRequest.of(page - 1, size, Sort.by("commentReportId").ascending());
    }
}
