package com.OmObe.OmO.Board.service;

import com.OmObe.OmO.Board.entity.Board;
import com.OmObe.OmO.Board.repository.BoardRepository;
import com.OmObe.OmO.exception.BusinessLogicException;
import com.OmObe.OmO.exception.ExceptionCode;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class BoardService {

    private final BoardRepository boardRepository;

    public BoardService(BoardRepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    public Board createBoard(Board board){
        return boardRepository.save(board);
    }

    public Board updateBoard(Board board){
        Board findBoard = findBoard(board.getBoardId());

        Optional.ofNullable(board.getTitle())
                .ifPresent(title -> findBoard.setTitle(title));
        Optional.ofNullable(board.getContent())
                .ifPresent(content -> findBoard.setContent(content));
        return boardRepository.save(findBoard);
    }

    public Board findBoard(long boardId){
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        Board board = optionalBoard.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        board.setViewCount(board.getViewCount()+1);
        return board;
    }

    public Board getBoard(long boardId){
        Board findBoard = findBoard(boardId);
        return boardRepository.save(findBoard);
    }

    public Slice<Board> findBoardsByCreatedAt(String type, int page, int size){
        return convertToSlice(boardRepository.findAll(withType(type),PageRequest.of(page, size,
                        Sort.by("createdAt").descending())));
    }

    public Slice<Board> findBoardsByViewCount(String type, int page, int size){
        return convertToSlice(boardRepository.findAll(withType(type),PageRequest.of(page, size,
                Sort.by("viewCount").descending())));
    }

    public void deleteBoard(long boardId){
        Board findBoard = findBoard(boardId);

        boardRepository.delete(findBoard);
    }

    public static Specification<Board> withType(String type){
        return (Specification<Board>) ((root, query, builder) ->
                builder.equal(root.get("type"),type));
    }

    public static Slice<Board> convertToSlice(Page<Board> page){
        return new SliceImpl<>(page.getContent(), page.getPageable(), page.hasNext());
    }

}
