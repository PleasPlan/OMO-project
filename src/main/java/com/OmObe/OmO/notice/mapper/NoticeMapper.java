package com.OmObe.OmO.notice.mapper;

import com.OmObe.OmO.notice.dto.NoticeDto;
import com.OmObe.OmO.notice.entity.Notice;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface NoticeMapper {
    // NoticeDto.Post -> Notice
    Notice noticePostDtoToNotice(NoticeDto.Post post);

    // Notice -> NoticeDto.Response
    NoticeDto.Response noticeToNoticeResponseDto(Notice notice);

    // NoticeDto.Patch -> Notice
    Notice noticePatchDtoToNotice(NoticeDto.Patch patch);
}
