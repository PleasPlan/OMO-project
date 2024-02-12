package com.OmObe.OmO.MyCourse.service;

import com.OmObe.OmO.MyCourse.entity.MyCourse;
import com.OmObe.OmO.MyCourse.repository.MyCourseRepository;
import com.OmObe.OmO.exception.BusinessLogicException;
import com.OmObe.OmO.exception.ExceptionCode;
import com.OmObe.OmO.member.entity.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class MyCourseService {

    private final MyCourseRepository myCourseRepository;

    public MyCourseService(MyCourseRepository myCourseRepository) {
        this.myCourseRepository = myCourseRepository;
    }

    public MyCourse createCourse(List<MyCourse> course, Member writer){
        log.info("enter 2-1");
        Collections.reverse(course);
        for(int i = 0; i<course.size(); i++){
            MyCourse part = course.get(i);
            part.setMember(writer);
            if(i<course.size()-1) {
                course.get(i + 1).setNextCourse(myCourseRepository.save(part));
            } else {
                myCourseRepository.save(part);
            }
        }
//        course.forEach(part -> part.setMember(writer));
//        course.forEach(part -> myCourseRepository.save(part));
        log.info("passed 2-1");
        return course.get(course.size()-1);
    }


    public MyCourse updateCourse(List<MyCourse> course){
        for(int i = 0; i<course.size(); i++){
            MyCourse part = findCourse(course.get(i).getCourseId());
            part.setPlaceName(course.get(i).getPlaceName());
            part.setPlaceId(course.get(i).getPlaceId());
            part.setTimes(course.get(i).getTimes());
            myCourseRepository.save(part);
        }
        return course.get(0);
    }

    public MyCourse findCourse(long courseId){
        Optional<MyCourse> optionalCourse = myCourseRepository.findById(courseId);
        MyCourse course = optionalCourse.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COURSE_NOT_FOUND));
        return course;
    }
}
