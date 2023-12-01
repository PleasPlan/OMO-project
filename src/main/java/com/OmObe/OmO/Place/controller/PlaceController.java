package com.OmObe.OmO.Place.controller;

import com.OmObe.OmO.Place.service.PlaceService;
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

    public PlaceController(PlaceService placeService) {
        this.placeService = placeService;
    }


    @GetMapping("/{category}")
    public ResponseEntity getPlaces(@PathVariable("category") String category){
        PairJ<Double, Double> middle = new PairJ<>();
        middle.setFirst(37.514322572335935);    // y (위도)
        middle.setSecond(127.06283102249932);   // x (경도)

        String response = placeService.getPlaces(category, middle);
        // json 응답 중 "is_end":false 가 되어있다면 다음 페이지가 존재하는 것이다.
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PutMapping("/{placeId}")
    public ResponseEntity MineOrRecommend(@PathVariable("placeId") long placeId,
                                          @RequestParam @Range(min = -1L,max = 1L) long mine,
                                          @RequestParam @Range(min = -1L,max = 1L) long recommend){
        String response = placeService.putMineOrRecommend(placeId,mine, recommend);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
