package com.OmObe.OmO.MyPage.controller;

import com.OmObe.OmO.Board.response.MultiResponseDto;
import com.OmObe.OmO.Board.response.PageInfo;
import com.OmObe.OmO.MyPage.service.MyPageService;
import com.OmObe.OmO.Place.entity.Place;
import com.OmObe.OmO.Place.entity.PlaceLike;
import com.OmObe.OmO.Place.service.PlaceService;
import com.OmObe.OmO.auth.jwt.TokenDecryption;
import com.OmObe.OmO.member.entity.Member;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/myPage")
public class MyPageController {
    private final MyPageService myPageService;
    private final PlaceService placeService;
    private final TokenDecryption tokenDecryption;

    public MyPageController(MyPageService myPageService, PlaceService placeService, TokenDecryption tokenDecryption) {
        this.myPageService = myPageService;
        this.placeService = placeService;
        this.tokenDecryption = tokenDecryption;
    }

    @GetMapping("/likes")
    public ResponseEntity getLikes(@RequestHeader("Authorization") String token,
                                   @RequestParam(defaultValue = "1") int page,
                                   @Positive @RequestParam(defaultValue = "10") int size) throws JsonProcessingException {
        Member member = tokenDecryption.getWriterInJWTToken(token);

        String placeList = myPageService.findPlaceLikedByMember(member, page - 1, size);

        return new ResponseEntity<>(placeList, HttpStatus.OK);
    }
}
