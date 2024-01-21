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
    default BoardReportDto.Response boardReportToBoardResponseDto(BoardReport boardReport){
        if (boardReport == null) {
            return null;
        } else {
            BoardReportDto.Response response = new BoardReportDto.Response();
            response.setBoardReportId(boardReport.getBoardReportId());
            response.setReportTYpe(boardReport.getReportType());
            response.setReason(boardReport.getReason());
            return response;
        }
    }

    // 신고 내용 목록 조회를 위한 ResponseDto List
    List<BoardReportDto.Response> boardReportToBoardReportResponseList(List<BoardReport> boardReports);
}
