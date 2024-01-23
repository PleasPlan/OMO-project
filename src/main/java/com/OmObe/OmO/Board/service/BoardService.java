package com.OmObe.OmO.Board.service;

import com.OmObe.OmO.Board.dto.BoardDto;
import com.OmObe.OmO.Board.entity.Board;
import com.OmObe.OmO.Board.mapper.BoardMapper;
import com.OmObe.OmO.Board.repository.BoardRepository;
import com.OmObe.OmO.Liked.entity.Liked;
import com.OmObe.OmO.Liked.repository.LikedRepository;
import com.OmObe.OmO.exception.BusinessLogicException;
import com.OmObe.OmO.exception.ExceptionCode;
import com.OmObe.OmO.member.entity.Member;
import com.OmObe.OmO.member.repository.MemberRepository;
import com.OmObe.OmO.member.service.MemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
@Slf4j
public class BoardService {

    private final BoardRepository boardRepository;
    private final LikedRepository likedRepository;
    private final MemberService memberService;
    private final MemberRepository memberRepository;
    private final BoardMapper mapper;

    public BoardService(BoardRepository boardRepository, LikedRepository likedRepository, MemberService memberService, MemberRepository memberRepository, BoardMapper mapper) {
        this.boardRepository = boardRepository;
        this.likedRepository = likedRepository;
        this.memberService = memberService;
        this.memberRepository = memberRepository;
        this.mapper = mapper;
    }

    public Board createBoard(Board board){
        return boardRepository.save(board);
    }

    public Board updateBoard(BoardDto.Patch patch){
        Board board = mapper.boardPatchDtoToBoard(patch);
        Board findBoard = findBoard(board.getBoardId());

        // 사용자의 로그인 인증 상태 검증
        memberService.verifiedAuthenticatedMember(findBoard.getMember().getMemberId());

        Optional.ofNullable(board.getTitle())
                .ifPresent(title -> findBoard.setTitle(title));
        Optional.ofNullable(board.getContent())
                .ifPresent(content -> findBoard.setContent(content));
        findBoard.setModifiedAt(LocalDateTime.now());
        return boardRepository.save(findBoard);
    }

    public Board findBoard(long boardId){
        Optional<Board> optionalBoard = boardRepository.findById(boardId);
        Board board = optionalBoard.orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        
        return board;
    }

    public Board getBoard(long boardId){
        Board findBoard = findBoard(boardId);
        findBoard.setViewCount(findBoard.getViewCount()+1);
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

    public Slice<Board> findBoardsByLikes(String type, int page, int size) {
        return convertToSlice(boardRepository.findAll(withType(type),PageRequest.of(page, size,
                Sort.by("likesCount").descending())));
    }

    public Slice<Board> findBoardsByComments(String type, int page, int size) {
        return convertToSlice(boardRepository.findAll(withType(type),PageRequest.of(page, size,
                Sort.by("commentsCount").descending())));
    }

    public void deleteBoard(long boardId){
        Board findBoard = findBoard(boardId);

        // 사용자 인증 상태 검증
        memberService.verifiedAuthenticatedMember(findBoard.getMember().getMemberId());

        boardRepository.delete(findBoard);
    }

    public void likesBoard(long boardId,Member member){
        List<Liked> likedList = likedRepository.findByBoardAndMember(findBoard(boardId), member);
        Liked liked = null;
        if(likedList.size() == 0){
            liked = new Liked();
            Board findBoard = findBoard(boardId);
            liked.addBoard(findBoard);
            liked.addMember(member);
            findBoard.addLike(liked);
            member.addLikes(liked);
            likedRepository.save(liked);
        }
        else{
            likedRepository.delete(likedList.get(0));
        }
    }

    public static Specification<Board> withType(String type){
        return (Specification<Board>) ((root, query, builder) ->
                builder.equal(root.get("type"),type));
    }

    public static Specification<Liked> withMemberId(long memberId){
        return (Specification<Liked>) ((root, query, builder) ->
                builder.equal(root.get("memberId"),memberId));
    }

    public static Slice<Board> convertToSlice(Page<Board> page){
        return new SliceImpl<>(page.getContent(), page.getPageable(), page.hasNext());
    }
}
