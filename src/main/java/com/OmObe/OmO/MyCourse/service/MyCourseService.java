package com.OmObe.OmO.MyCourse.service;

import com.OmObe.OmO.MyCourse.entity.MyCourse;
import com.OmObe.OmO.MyCourse.repository.MyCourseRepository;
import com.OmObe.OmO.member.entity.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class MyCourseService {

    private final MyCourseRepository myCourseRepository;

    public MyCourseService(MyCourseRepository myCourseRepository) {
        this.myCourseRepository = myCourseRepository;
    }

    public MyCourse createCourse(List<MyCourse> course, Member writer){
        for(int i = 0; i<course.size(); i++){
            MyCourse part = course.get(i);
            part.setMember(writer);
            myCourseRepository.save(part);
        }
        return course.get(0);
    }
}
