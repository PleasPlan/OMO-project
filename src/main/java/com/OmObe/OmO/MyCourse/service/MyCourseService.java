package com.OmObe.OmO.MyCourse.service;

import com.OmObe.OmO.MyCourse.entity.MyCourse;
import com.OmObe.OmO.MyCourse.entity.MyCourseLike;
import com.OmObe.OmO.MyCourse.repository.MyCourseLikeRepository;
import com.OmObe.OmO.MyCourse.repository.MyCourseRepository;
import com.OmObe.OmO.exception.BusinessLogicException;
import com.OmObe.OmO.exception.ExceptionCode;
import com.OmObe.OmO.member.entity.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class MyCourseService {

    private final MyCourseRepository myCourseRepository;
    private final MyCourseLikeRepository myCourseLikeRepository;

    public MyCourseService(MyCourseRepository myCourseRepository,
                           MyCourseLikeRepository myCourseLikeRepository) {
        this.myCourseRepository = myCourseRepository;
        this.myCourseLikeRepository = myCourseLikeRepository;
    }

    public MyCourse createCourse(List<MyCourse> course, Member writer){
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
        return course.get(course.size()-1);
    }


    public MyCourse updateCourse(List<MyCourse> course,long startId, Member writer){
        log.info("enter 3-1");
        Collections.reverse(course);
        List<Long> courseIdList = new ArrayList<>();

        searchIdList(courseIdList,startId);
        Collections.reverse(courseIdList);

        if(course.size() < courseIdList.size()) {
            for (int i = 0; i < course.size(); i++) {
                MyCourse part = findCourse(courseIdList.get(i));
                part.setPlaceName(course.get(i).getPlaceName());
                part.setPlaceId(course.get(i).getPlaceId());
                part.setTimes(course.get(i).getTimes());
                part.setModifiedAt(LocalDateTime.now());
                if (i == course.size() - 1) {
                    part.setNextCourse(null);
                    // TODO : 이후 있는 모든 연결 데이터 삭제
                    deleteCourse(courseIdList.get(i+1));
                }
                myCourseRepository.save(part);
            }
        } else {
            for (int i = 0; i < courseIdList.size(); i++) {
                MyCourse part = findCourse(courseIdList.get(i));
                part.setPlaceName(course.get(i).getPlaceName());
                part.setPlaceId(course.get(i).getPlaceId());
                part.setTimes(course.get(i).getTimes());
                part.setModifiedAt(LocalDateTime.now());
                myCourseRepository.save(part);
            }

            // 새로운 요소가 추가됐을 때
            for (int i = courseIdList.size(); i < course.size(); i++) {
                MyCourse part = course.get(i);
                part.setMember(writer);
                if (i < course.size() - 1) {
                    course.get(i + 1).setNextCourse(myCourseRepository.save(part));
                } else {
                    MyCourse lastPart = findCourse(courseIdList.get(courseIdList.size() - 1));
                    lastPart.setNextCourse(myCourseRepository.save(part));
                    myCourseRepository.save(lastPart);
                }
            }
        }
        log.info("passed 3-1");
        return findCourse(startId);
    }

    public MyCourse getCourse(long courseId){
        MyCourse start = findCourse(courseId);
        start.setViewCount(start.getViewCount()+1);
        return myCourseRepository.save(start);
    }

    public Slice<MyCourse> findCourses(String sortBy,int mbti,int page, int size){
        return convertToSlice(myCourseRepository.findAll(withMemberMBTI(mbti), PageRequest.of(page,size,
                Sort.by(sortBy).descending())));
    }

    public void deleteCourse(long courseId){
        MyCourse start = findCourse(courseId);
        myCourseRepository.delete(start);
    }

    public MyCourse findCourse(long courseId){
        Optional<MyCourse> optionalCourse = myCourseRepository.findById(courseId);
        MyCourse course = optionalCourse.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COURSE_NOT_FOUND));
        return course;
    }



    public void searchIdList(List<Long> courseIdList, long startId){
        MyCourse mc = findCourse(startId);
        if(mc.getNextCourse() != null){
            searchIdList(courseIdList,mc.getNextCourse().getCourseId());
        }
        courseIdList.add(startId);
    }

    public static Specification<MyCourse> withMemberMBTI(int mbti){
        return (Specification<MyCourse>) ((root, query, builder) ->
                builder.and(
                builder.equal(root.get("member").get("mbti"),mbti),
                builder.isNotNull(root.get("courseName"))
                )
        );
    }

    public static Slice<MyCourse> convertToSlice(Page<MyCourse> page){
        return new SliceImpl<>(page.getContent(), page.getPageable(), page.hasNext());
    }

    public String createCourseLike(Member member, long startId) {
        MyCourse myCourse = findCourse(startId);
        Optional<MyCourseLike> optionalMyCourseLike = myCourseLikeRepository.findByMemberAndMyCourse(member,myCourse);
        if(optionalMyCourseLike.isEmpty()) {
            MyCourseLike myCourseLike = new MyCourseLike();
            myCourseLike.setMyCourse(myCourse);
            myCourseLike.setMember(member);
            myCourseLikeRepository.save(myCourseLike);
            myCourse.setLikeCount(myCourse.getLikeCount()+1);
            myCourseRepository.save(myCourse);
            return "saved!";
        }else{
            myCourse.setLikeCount(myCourse.getLikeCount()-1);
            myCourseRepository.save(myCourse);
            myCourseLikeRepository.delete(optionalMyCourseLike.get());
            return "deleted!";
        }
    }
}
