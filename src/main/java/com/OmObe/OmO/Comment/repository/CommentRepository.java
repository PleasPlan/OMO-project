package com.OmObe.OmO.Comment.repository;

import com.OmObe.OmO.Comment.entity.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {
    Optional<List<Comment>> findByPlaceId(long placeId);
    Page<Comment> findByBoardId(long boardId, Pageable pageable);
}
