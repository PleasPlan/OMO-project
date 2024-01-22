package com.OmObe.OmO.report.commentreport.mapper;

import com.OmObe.OmO.report.commentreport.dto.CommentReportDto;
import com.OmObe.OmO.report.commentreport.entity.CommentReport;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommentReportMapper {
    // CommentReportDto.Post -> CommentReport
    CommentReport commentReportPostDtoToCommentReport(CommentReportDto.Post post);

    // CommentReport -> CommentReportDto.Response
    CommentReportDto.Response commentReportToCommentResponseDto(CommentReport commentReport);

    // 신고 내용 목록 조회를 위한 ResponseDto List
    List<CommentReportDto.Response> commentReportListToCommentResponseDtoList(List<CommentReport> commentReports);
}
