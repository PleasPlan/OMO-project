package com.OmObe.OmO.Place.repository;

import com.OmObe.OmO.Place.entity.Place;
import com.OmObe.OmO.Place.entity.PlaceRecommend;
import com.OmObe.OmO.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PlaceRecommendRepository extends JpaRepository<PlaceRecommend, Long> {
    Optional<PlaceRecommend> findByMemberAndPlace(Member member, Place place);
}
