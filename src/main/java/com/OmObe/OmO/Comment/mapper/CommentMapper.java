package com.OmObe.OmO.Comment.mapper;

import com.OmObe.OmO.Board.entity.Board;
import com.OmObe.OmO.Board.repository.BoardRepository;
import com.OmObe.OmO.Comment.dto.CommentDto;
import com.OmObe.OmO.Comment.entity.Comment;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CommentMapper {

    private final BoardRepository boardRepository;

    public CommentMapper(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public Comment commentPostToComment(CommentDto.Post postDto){
        if (postDto == null){
            return null;
        } else {
            Comment comment = new Comment();
            Optional<Board> boardOptional = boardRepository.findById(postDto.getBoardId());
            Board board = boardOptional.orElseThrow();
            String content = postDto.getContent();
            comment.setBoard(board);
            comment.setContent(content);
            return comment;
        }
    }

    public Comment commentPatchDtoToComment(CommentDto.Patch patchDto){
        if(patchDto == null){
            return null;
        } else {
            Comment comment = new Comment();
            comment.setCommentId(patchDto.getCommentId());
            comment.setContent(patchDto.getContent());
            return comment;
        }
    }
}
