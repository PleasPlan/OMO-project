package com.OmObe.OmO.Board.repository;

import com.OmObe.OmO.Board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board,Long>, JpaSpecificationExecutor<Board> {
    Optional<Board> findById(long boardId);
}
