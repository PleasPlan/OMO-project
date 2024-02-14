package com.OmObe.OmO.MyPage.controller;

import com.OmObe.OmO.Board.dto.BoardDto;
import com.OmObe.OmO.Board.entity.Board;
import com.OmObe.OmO.Board.mapper.BoardMapper;
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
import java.util.Collections;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/myPage")
public class MyPageController {
    private final MyPageService myPageService;
    private final TokenDecryption tokenDecryption;
    private final BoardMapper boardMapper;

    public MyPageController(MyPageService myPageService, TokenDecryption tokenDecryption, BoardMapper boardMapper) {
        this.myPageService = myPageService;
        this.tokenDecryption = tokenDecryption;
        this.boardMapper = boardMapper;
    }

    @GetMapping("/likes")
    public ResponseEntity getLikes(@RequestHeader("Authorization") String token,
                                   @RequestParam(defaultValue = "1") int page,
                                   @Positive @RequestParam(defaultValue = "10") int size) throws JsonProcessingException {
        Member member = tokenDecryption.getWriterInJWTToken(token);

        String placeList = myPageService.findPlaceLikedByMember(member, page - 1, size);

        return new ResponseEntity<>(placeList, HttpStatus.OK);
    }

    @GetMapping("/recommend")
    public ResponseEntity getRecommend(@RequestHeader("Authorization") String token,
                                       @RequestParam(defaultValue = "1") int page,
                                       @Positive @RequestParam(defaultValue = "10") int size) throws JsonProcessingException {
        Member member = tokenDecryption.getWriterInJWTToken(token);

        String placeList = myPageService.findPlaceRecommendByMember(member, page - 1, size);

        return new ResponseEntity<>(placeList, HttpStatus.OK);
    }

    // No Content가 나오면 더이상 페이지가 없다는 뜻이다.
    @GetMapping("/myBoard")
    public ResponseEntity getMyBoard(@RequestHeader("Authorization") String token,
                                     @RequestParam(defaultValue = "1") int page,
                                     @Positive @RequestParam(defaultValue = "10") int size) throws JsonProcessingException {
        Member member = tokenDecryption.getWriterInJWTToken(token);

        List<Board> boardList = myPageService.getMyBoard(member,page-1,size);
        if(boardList.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(boardMapper.boardsToBoardResponseDtos(boardList), HttpStatus.OK);
        }
    }
}
