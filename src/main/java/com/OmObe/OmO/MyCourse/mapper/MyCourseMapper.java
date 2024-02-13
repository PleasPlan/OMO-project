package com.OmObe.OmO.MyCourse.mapper;

import com.OmObe.OmO.MyCourse.dto.MyCourseDto;
import com.OmObe.OmO.MyCourse.entity.MyCourse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
@Slf4j
public class MyCourseMapper {
    public List<MyCourse> coursePostDtoToCourse(MyCourseDto.Post postDto){
        if(postDto == null){
            log.error("no value");
            return null;
        } else if ((postDto.getTime().size() != postDto.getPlaceName().size())
                        ||
                (postDto.getPlaceName().size() != postDto.getPlaceId().size()))
        {     // 무결성 검사 -> 세 List의 크기가 같다면
            log.error("unbalanced values");
            return null;
        }
        else {
            List<MyCourse> courseList = new ArrayList<>();
            settingNextCoursePost(courseList,postDto);
            /*for(int index = postDto.getPlaceName().size()-1; index>=0; index--) {
                MyCourse course = new MyCourse();
                course.setCourseName(postDto.getCourseName());
                course.setPlaceName(postDto.getPlaceName().get(index));
                log.info(course.getPlaceName());
                course.setPlaceId(postDto.getPlaceId().get(index));
                course.setTimes(postDto.getTime().get(index));
                if(index == 0){
                    course.setNextCourse(null);
                } else {
                    course.setNextCourse(courseList.get(index-1));
                }
                courseList.add(course);
                log.info("added");
            }*/
            Collections.reverse(courseList);
            return courseList;
        }
    }

    public List<MyCourse> coursePatchDtoToCourse(MyCourseDto.Patch patchDto){
        if(patchDto == null){
            return null;
        } else if ((patchDto.getTime().size() != patchDto.getPlaceName().size())
                        ||
                (patchDto.getPlaceName().size() != patchDto.getPlaceId().size())
        ){     // 무결성 검사 -> 세 List의 크기가 같다면
            return null;
        }
        else {
            List<MyCourse> courseList = new ArrayList<>();
            settingNextCoursePatch(courseList,patchDto);
            return courseList;
        }
    }

    public static MyCourseDto.Response courseToCourseResponseDto(MyCourse course){
        if(course == null){
            return null;
        } else {
            String courseName = course.getCourseName();
            List<MyCourseDto.ResponseSmall> contents = new ArrayList<>();
            getNextCourses(contents,course);
            Collections.reverse(contents);
            LocalDateTime createdAt = course.getCreatedAt();
            LocalDateTime modifiedAt = course.getModifiedAt();
            String writerName = course.getMember().getNickname();

            MyCourseDto.Response response = new MyCourseDto.Response(courseName,contents,createdAt,modifiedAt,writerName);
            return response;
        }
    }

    private static void settingNextCoursePost(List<MyCourse> courseList, MyCourseDto.Post postDto){
        for(int index = postDto.getPlaceName().size()-1; index>=0; index--) {
            MyCourse course = new MyCourse();
            course.setCourseName(postDto.getCourseName());
            course.setPlaceName(postDto.getPlaceName().get(index));
            course.setPlaceId(postDto.getPlaceId().get(index));
            course.setTimes(postDto.getTime().get(index));
            courseList.add(course);
        }
    }

    private static void settingNextCoursePatch(List<MyCourse> courseList, MyCourseDto.Patch patchDto){
        for(int index = patchDto.getPlaceName().size()-1; index>=0; index--) {
            MyCourse course = new MyCourse();
            course.setCourseName(patchDto.getCourseName());
            course.setPlaceName(patchDto.getPlaceName().get(index));
            course.setPlaceId(patchDto.getPlaceId().get(index));
            course.setTimes(patchDto.getTime().get(index));
            courseList.add(course);
        }
    }
    /*private static MyCourse settingNextCoursePatch(List<MyCourse> courseList, MyCourseDto.Patch patchDto, int index){
        MyCourse course = new MyCourse();
        course.setCourseName(patchDto.getCourseName());
        course.setPlaceName(patchDto.getPlaceName().get(index));
        course.setPlaceId(patchDto.getPlaceId().get(index));
        course.setTimes(patchDto.getTime().get(index));
        courseList.add(course);
        return course;
    }*/
    private static void getNextCourses(List<MyCourseDto.ResponseSmall> contents, MyCourse course){
        MyCourseDto.ResponseSmall responseSmall = new MyCourseDto.ResponseSmall(course.getPlaceName(),
                course.getPlaceId(),
                course.getTimes());
        if(course.getNextCourse() != null){
            getNextCourses(contents, course.getNextCourse());
        }
        contents.add(responseSmall);
    }
}
