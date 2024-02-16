package com.OmObe.OmO.MyCourse.repository;

import com.OmObe.OmO.MyCourse.entity.MyCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MyCourseRepository extends JpaRepository<MyCourse,Long> {
}
