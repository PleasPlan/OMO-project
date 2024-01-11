package com.OmObe.OmO.notice.mapper;

import com.OmObe.OmO.notice.dto.NoticeDto;
import com.OmObe.OmO.notice.entity.Notice;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NoticeMapper {
    // NoticeDto.Post -> Notice
    Notice noticePostDtoToNotice(NoticeDto.Post post);

    // Notice -> NoticeDto.Response
    NoticeDto.Response noticeToNoticeResponseDto(Notice notice);

    // NoticeDto.Patch -> Notice
    Notice noticePatchDtoToNotice(NoticeDto.Patch patch);

    // 공지 사항 목록 조회를 위한 ResponseDto List
    List<NoticeDto.Response> noticeToNoticeResponseList(List<Notice> notices);
}
