package com.OmObe.OmO.MyCourse.controller;

import com.OmObe.OmO.MyCourse.dto.MyCourseDto;
import com.OmObe.OmO.MyCourse.entity.MyCourse;
import com.OmObe.OmO.MyCourse.mapper.MyCourseMapper;
import com.OmObe.OmO.MyCourse.service.MyCourseService;
import com.OmObe.OmO.auth.jwt.TokenDecryption;
import com.OmObe.OmO.member.entity.Member;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Slf4j
@Validated
@RequestMapping("/mycourse")
public class MyCourseController {

    private final MyCourseService myCourseService;
    private final MyCourseMapper mapper;
    private final TokenDecryption tokenDecryption;

    public MyCourseController(MyCourseService myCourseService,
                              MyCourseMapper mapper,
                              TokenDecryption tokenDecryption) {
        this.myCourseService = myCourseService;
        this.mapper = mapper;
        this.tokenDecryption = tokenDecryption;
    }


    @PostMapping("/new")
    public ResponseEntity postCourse(@RequestBody MyCourseDto.Post postDto,
                                     @RequestHeader("Authorization") String token) throws JsonProcessingException {
        List<MyCourse> courseList = mapper.coursePostDtoToCourse(postDto);
        Member writer = tokenDecryption.getWriterInJWTToken(token);

        log.info("passed 1");
        MyCourse myCourse = myCourseService.createCourse(courseList,writer);
        log.info("passed 2");
        MyCourseDto.Response response = mapper.courseToCourseResponseDto(myCourse);
        log.info("passed 3");
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @PutMapping("/rebuild")
    public ResponseEntity patchCourse(@RequestBody MyCourseDto.Patch patchDto,
                                      @RequestHeader("Authorization") String token) throws JsonProcessingException {
        List<MyCourse> courseList = mapper.coursePatchDtoToCourse(patchDto);
        Long startId = patchDto.getCourseId();
        Member writer = tokenDecryption.getWriterInJWTToken(token);
        MyCourse myCourse = myCourseService.updateCourse(courseList,startId,writer);
        MyCourseDto.Response response = mapper.courseToCourseResponseDto(myCourse);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{course-id}")
    public ResponseEntity getCourse(@RequestHeader("Authorization") String token,
                                    @PathVariable("course-id") long startId){
        MyCourse myCourse = myCourseService.getCourse(startId);
        MyCourseDto.Response response = mapper.courseToCourseResponseDto(myCourse);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{course-id}")
    public ResponseEntity deleteCourse(@RequestHeader("Authorization") String token,
                                       @PathVariable("course-id") long startId){
        myCourseService.deleteCourse(startId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}