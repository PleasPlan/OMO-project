package com.OmObe.OmO.report.boardreport.repository;

import com.OmObe.OmO.report.boardreport.entity.BoardReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardReportRepository extends JpaRepository<BoardReport, Long> {
}
