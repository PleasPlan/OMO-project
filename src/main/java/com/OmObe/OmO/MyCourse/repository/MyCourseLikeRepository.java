package com.OmObe.OmO.MyCourse.repository;

import com.OmObe.OmO.MyCourse.entity.MyCourse;
import com.OmObe.OmO.MyCourse.entity.MyCourseLike;
import com.OmObe.OmO.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.Optional;


public interface MyCourseLikeRepository extends JpaRepository<MyCourseLike, Long>, JpaSpecificationExecutor<MyCourseLike> {
    Optional<MyCourseLike> findByMemberAndMyCourse(Member member, MyCourse myCourse);
}
