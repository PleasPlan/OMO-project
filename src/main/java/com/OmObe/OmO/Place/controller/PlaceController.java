package com.OmObe.OmO.Place.controller;

import com.OmObe.OmO.Place.service.PlaceService;
import lombok.extern.slf4j.Slf4j;
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
        String response = placeService.getPlaces(category);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
