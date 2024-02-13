package com.OmObe.OmO.report.boardreport.mapper;

import com.OmObe.OmO.report.boardreport.dto.BoardReportDto;
import com.OmObe.OmO.report.boardreport.entity.BoardReport;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface BoardReportMapper {
    // BoardReportDto.Post -> BoardReport
    BoardReport boardReportPostDtoToBoardReport(BoardReportDto.Post post);

    // Board -> BoardReportDto.Response
    BoardReportDto.Response boardReportToBoardResponseDto(BoardReport boardReport);

    // 신고 내용 목록 조회를 위한 ResponseDto List
    List<BoardReportDto.Response> boardReportToBoardReportResponseList(List<BoardReport> boardReports);
}