package com.OmObe.OmO.report.commentreport.repository;

import com.OmObe.OmO.report.commentreport.entity.CommentReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentReportRepository extends JpaRepository<CommentReport, Long> {
}
