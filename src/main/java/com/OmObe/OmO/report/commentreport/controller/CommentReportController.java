package com.OmObe.OmO.report.commentreport.controller;

import com.OmObe.OmO.report.commentreport.dto.CommentReportDto;
import com.OmObe.OmO.report.commentreport.entity.CommentReport;
import com.OmObe.OmO.report.commentreport.mapper.CommentReportMapper;
import com.OmObe.OmO.report.commentreport.service.CommentReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Validated
@RequiredArgsConstructor
@RequestMapping("/commentReport")
public class CommentReportController {
    private final CommentReportService commentReportService;
    private final CommentReportMapper mapper;

    // 댓글 신고
    @PostMapping("/{commentId}")
    public ResponseEntity postCommentReport(@RequestBody @Valid CommentReportDto.Post post,
                                            @RequestHeader("Authorization") String token,
                                            @PathVariable("commentId") Long commentId) {
        CommentReport commentReport = commentReportService.createCommentReport(post, token, commentId);

        return new ResponseEntity<>(mapper.commentReportToCommentResponseDto(commentReport), HttpStatus.CREATED);
    }
}
