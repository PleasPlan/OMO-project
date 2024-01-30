package com.OmObe.OmO.MyCourse.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@Validated
@RequestMapping("/mycourse")
public class MyCourseController {

    @PostMapping("/new")
    public ResponseEntity postCourse(){
    }

    @PatchMapping("/rebuild")
    public ResponseEntity patchCourse(){

    }

    @GetMapping("/{course-id}")
    public ResponseEntity getCourse(){

    }

    @DeleteMapping("/{course-id}")
    public ResponseEntity deleteCourse(){
        
    }
}
