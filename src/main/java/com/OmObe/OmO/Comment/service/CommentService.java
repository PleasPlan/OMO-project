package com.OmObe.OmO.Comment.service;

import com.OmObe.OmO.Board.entity.Board;
import com.OmObe.OmO.Comment.entity.Comment;
import com.OmObe.OmO.Comment.repository.CommentRepository;
import com.OmObe.OmO.exception.BusinessLogicException;
import com.OmObe.OmO.exception.ExceptionCode;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment createComment(Comment comment){
        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment){
        Comment findComment = findComment(comment.getCommentId());

        Optional.ofNullable(comment.getContent())
                .ifPresent(content -> findComment.setContent(content));
        findComment.setModifiedAt(LocalDateTime.now());
        return commentRepository.save(findComment);
    }

    public Comment findComment(long commentId){
        Optional<Comment> optionalComment = commentRepository.findById(commentId);
        Comment comment = optionalComment.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
        return comment;
    }

//    public Slice<Comment> findComments(int page, int size){
//        return convertToSlice(commentRepository.findAll(PageRequest.of(page, size,
//                Sort.by("createdAt").descending())));
//    }

    public Slice<Comment> findComments(int page, int size, long boardId){
        return convertToSlice(commentRepository.findByBoardId(boardId,PageRequest.of(page, size,
                Sort.by("createdAt").descending())));
    }

    public void deleteComment(long commentId){
        Comment findComment = findComment(commentId);

        commentRepository.delete(findComment);
    }

    public static Slice<Comment> convertToSlice(Page<Comment> page){
        return new SliceImpl<>(page.getContent(), page.getPageable(), page.hasNext());
    }
}
