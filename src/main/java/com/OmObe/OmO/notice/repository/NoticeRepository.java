package com.OmObe.OmO.notice.repository;

import com.OmObe.OmO.notice.entity.Notice;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

    // 공지사항의 type에 따라 공지사항 목록을 제공하는 메서드
    Slice<Notice> findByType(String type, Pageable pageable);
}
