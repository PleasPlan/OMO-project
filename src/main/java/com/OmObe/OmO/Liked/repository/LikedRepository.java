package com.OmObe.OmO.Liked.repository;

import com.OmObe.OmO.Board.entity.Board;
import com.OmObe.OmO.Liked.entity.Liked;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikedRepository extends JpaRepository<Liked, Long> {
    Optional<Liked> findByBoard(Board board);
}
