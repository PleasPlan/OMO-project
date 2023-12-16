package com.OmObe.OmO.Place.repository;

import com.OmObe.OmO.Place.entity.PlaceLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PlaceLikeRepository extends JpaRepository<PlaceLike, Long> {
    Optional<PlaceLike> findByMemberAndPlace(long memberId, long placeId);
}
