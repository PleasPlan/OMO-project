package com.OmObe.OmO.Place.controller;

import com.OmObe.OmO.Place.service.PlaceService;
import com.OmObe.OmO.member.entity.Member;
import com.OmObe.OmO.member.service.MemberService;
import com.OmObe.OmO.util.PairJ;
import com.nimbusds.jose.util.Pair;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.constraints.Range;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@Slf4j
@Validated
@RequestMapping("/place")
public class PlaceController {
    private final PlaceService placeService;
    private final MemberService memberService;

    public PlaceController(PlaceService placeService, MemberService memberService) {
        this.placeService = placeService;
        this.memberService = memberService;
    }

    @GetMapping("/list/{category}")
    public ResponseEntity getPlaces(@PathVariable("category") String category,
                                    @RequestHeader @Range(min = 0,max = 90) double y,
                                    @RequestHeader @Range(min = -180,max = 180) double x){
        PairJ<Double, Double> middle = new PairJ<>();
        middle.setFirst(y);    // y (위도)
        middle.setSecond(x);   // x (경도)

        String response = placeService.getPlaces(category, middle);
        // json 응답 중 "is_end":false 가 되어있다면 다음 페이지가 존재하는 것이다.
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{placeId}")
    public ResponseEntity MineOrRecommend(@PathVariable("placeId") long placeId,
                                          @RequestHeader("Authorization") String Token,
                                          @RequestHeader("memberId") long memberId,
                                          @RequestHeader boolean LR){
                                          // Like = true, Recommend = false

        String response = placeService.putMineOrRecommend(placeId, memberId, LR);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/{placeName}")
    public ResponseEntity getPlace(@PathVariable("placeName") String placeName){
        String response = placeService.getPlace(placeName);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
