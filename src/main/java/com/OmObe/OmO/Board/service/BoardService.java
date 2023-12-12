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
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Service
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

    /**
     * <게시글 작성>
     * 1. 토큰 검증(글을 작성하려는 사용자가 로그인이 된 사용자인지 검증-> 헤더에 올바른 토큰이 담겼는지 검증)
     * 2. 회원 매핑
     * 3. 게시글 등록
     */
    public Board createBoard(BoardDto.Post postDto, Long memberId){
        Board board = mapper.boardPostDtoToBoard(postDto);

        // 1. 토큰 검증(글을 작성하려는 사용자가 로그인이 된 사용자인지 검증-> 헤더에 올바른 토큰이 담겼는지 검증)
        memberService.verifiedAuthenticatedMember(memberId);

        // 2. 회원 매핑
        Optional<Member> member = memberRepository.findById(memberId);
        board.setMember(member.orElseThrow(() ->
        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND)));

        // 3. 개시글 등록
        return boardRepository.save(board);
    }

    public Board updateBoard(Board board){
        Board findBoard = findBoard(board.getBoardId());

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

        boardRepository.delete(findBoard);
    }

    public void likesBoard(long boardId, String token){
        // 로그인한 유저인지 검증
        memberService.verifiedAuthenticatedMember(boardId);
        Member member = memberService.findLoggedInMember(token);
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
