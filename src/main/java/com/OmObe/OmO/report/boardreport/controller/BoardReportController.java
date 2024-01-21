package com.OmObe.OmO.report.boardreport.controller;

import com.OmObe.OmO.report.boardreport.dto.BoardReportDto;
import com.OmObe.OmO.report.boardreport.entity.BoardReport;
import com.OmObe.OmO.report.boardreport.mapper.BoardReportMapper;
import com.OmObe.OmO.report.boardreport.service.BoardReportService;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/boardReport")
@RequiredArgsConstructor
@Validated
public class BoardReportController {
    private final BoardReportService boardReportService;
    private final BoardReportMapper mapper;

    // 게시글 신고
    @PostMapping("/{boardId}")
    public ResponseEntity postBoardReport(@RequestBody @Valid BoardReportDto.Post post,
                                          @RequestHeader("Authorization") String token,
                                          @PathVariable("boardId") Long boardId) {
        BoardReport boardReport = boardReportService.createBoardReport(post, token, boardId);

        return new ResponseEntity<>(mapper.boardReportToBoardResponseDto(boardReport), HttpStatus.CREATED);
    }
}
