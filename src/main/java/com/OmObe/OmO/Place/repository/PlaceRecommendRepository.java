package com.OmObe.OmO.Place.repository;

import com.OmObe.OmO.Place.entity.PlaceRecommend;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlaceRecommendRepository extends JpaRepository<PlaceRecommend, Long> {
    Optional<PlaceRecommend> findByMemberAndPlace(long memberId, long placeId);
}
