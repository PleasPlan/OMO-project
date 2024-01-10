package com.OmObe.OmO.notice.controller;

import com.OmObe.OmO.auth.jwt.TokenDecryption;
import com.OmObe.OmO.member.entity.Member;
import com.OmObe.OmO.notice.dto.NoticeDto;
import com.OmObe.OmO.notice.entity.Notice;
import com.OmObe.OmO.notice.mapper.NoticeMapper;
import com.OmObe.OmO.notice.service.NoticeService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/notice")
@RequiredArgsConstructor
@Validated
public class NoticeController {
    private final NoticeService noticeService;
    private final NoticeMapper mapper;

    // 공지사항 작성
    @PostMapping("/write")
    public ResponseEntity postNotice(@RequestBody @Valid NoticeDto.Post post, @RequestHeader("Authorization") String token) throws JsonProcessingException {
        Notice notice = noticeService.createNotice(post, token);

        return new ResponseEntity<>(mapper.noticeToNoticeResponseDto(notice), HttpStatus.CREATED);
    }

}
