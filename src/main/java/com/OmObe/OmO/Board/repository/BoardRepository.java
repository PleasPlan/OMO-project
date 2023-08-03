package com.OmObe.OmO.Board.repository;

import com.OmObe.OmO.Board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BoardRepository extends JpaRepository<Board, Long> {
}
