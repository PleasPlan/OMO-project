package com.OmObe.OmO.Board.controller;

import com.OmObe.OmO.Board.dto.BoardDto;
import com.OmObe.OmO.Board.entity.Board;
import com.OmObe.OmO.Board.mapper.BoardMapper;
import com.OmObe.OmO.Board.response.MultiResponseDto;
import com.OmObe.OmO.Board.service.BoardService;
import com.OmObe.OmO.Liked.entity.Liked;
import com.OmObe.OmO.Liked.repository.LikedRepository;
import com.OmObe.OmO.exception.BusinessLogicException;
import com.OmObe.OmO.exception.ExceptionCode;
import com.OmObe.OmO.member.entity.Member;
import com.OmObe.OmO.member.repository.MemberRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@Slf4j
@Validated
@RequestMapping("/board")
public class BoardController {
    private final BoardService boardService;
    private final BoardMapper mapper;
    private final MemberRepository memberRepository;
    private final LikedRepository likedRepository;

    public BoardController(BoardService boardService, BoardMapper mapper, MemberRepository memberRepository, LikedRepository likedRepository) {
        this.boardService = boardService;
        this.mapper = mapper;
        this.memberRepository = memberRepository;
        this.likedRepository = likedRepository;
    }

    /*
*   Subject : email
*   Claim : email
*
*
* */


    @SneakyThrows
    @PostMapping("/write")
    public ResponseEntity postBoard(@Valid @RequestBody BoardDto.Post postDto,
                                     @RequestHeader("Authorization") String Token,
                                    @RequestHeader("memberId") Long memberId){ // 글 작성 시 토큰 검증을 위해 memberId가 필요

        Board board = boardService.createBoard(postDto, memberId);
        BoardDto.Response response = mapper.boardToBoardResponseDto(board);
        // 이미 jwt 검증 코드가 있기 때문에 기존 검증 코드를 사용하기 위해 이전 코드는 제거
//        Board board = mapper.boardPostDtoToBoard(postDto);
//        Member writer = getWriterInJWTToken(Token);
//        board.setMember(writer);
//
//        Board response = boardService.createBoard(board);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

//    // TODO: JWT 서비스 시에 삭제할 것.
//    @SneakyThrows
//    @PostMapping("/write")
//    public ResponseEntity postBoard(@Valid @RequestBody BoardDto.Post postDto,
//                                    @RequestParam Long memberId){
//        Board board = mapper.boardPostDtoToBoard(postDto);
//        Optional<Member> optionalMember = memberRepository.findById(memberId);
//        Member findMember = optionalMember.orElseThrow(() ->
//                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
//        board.setMember(findMember);
//
//        Board response = boardService.createBoard(board);
//        return new ResponseEntity<>(mapper.boardToBoardResponseDto(response),
//                HttpStatus.CREATED);
//    }

    @SneakyThrows
    @PatchMapping("/modification/{board-id}")
    public ResponseEntity patchBoard(@Valid @RequestBody BoardDto.Patch patchDto,
                                     @PathVariable("board-id") @Positive long boardId){
        patchDto.setBoardId(boardId);

        Board board = mapper.boardPatchDtoToBoard(patchDto);
        Board response = boardService.updateBoard(board);;

        return new ResponseEntity<>(mapper.boardToBoardResponseDto(response),
                HttpStatus.OK);
    }

    @GetMapping("/{board-id}")
    public ResponseEntity getBoard(@PathVariable("board-id") @Positive long boardId){
        Board board = boardService.getBoard(boardId);

        return new ResponseEntity<>(mapper.boardToBoardResponseDto(board),
                HttpStatus.OK);
    }

    // TODO : size를 고정하고 싶은데 한번 로드할 때 얼마나 할지로 나중에 회의로 정해야겠당.

    // 다음 페이지가 있을 때 다음 페이지 로드 가능
    // 좋아요 순, 최신 순, 댓글 많은 순, 조회수 많은 순
    @GetMapping("/Trouble")
    public ResponseEntity getTroubleBoards(@RequestParam(defaultValue = "1") int page,
                                           @Positive @RequestParam(defaultValue = "10") int size,
                                           @RequestParam String sorting){
        Slice<Board> pageBoards = null;
            switch (sorting){
                case "createdAt":
                    pageBoards = boardService.findBoardsByCreatedAt("TROUBLE",page-1, size);
                    break;
                case "viewCount":
                    pageBoards = boardService.findBoardsByViewCount("TROUBLE", page-1, size);
                    break;
                case "likes":
                    pageBoards = boardService.findBoardsByLikes("TROUBLE", page-1, size);
                    break;
                case "comments":
                    pageBoards = boardService.findBoardsByComments("TROUBLE", page-1, size);
                    break;
            }
        List<Board> boards = pageBoards.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.boardsToBoardResponseDtos(boards),pageBoards),HttpStatus.OK);

    }

    @GetMapping("/Free")
    public ResponseEntity getFreeBoards(@RequestParam(defaultValue = "1") int page,
                                           @Positive @RequestParam(defaultValue = "10") int size,
                                           @RequestParam String sorting){
        Slice<Board> pageBoards = null;
        switch (sorting){
            case "createdAt":
                pageBoards = boardService.findBoardsByCreatedAt("FREE",page-1, size);
                break;
            case "viewCount":
                pageBoards = boardService.findBoardsByViewCount("FREE", page-1, size);
                break;
            case "likes":
                pageBoards = boardService.findBoardsByLikes("FREE", page-1, size);
                break;
            case "comments":
                pageBoards = boardService.findBoardsByComments("FREE", page-1, size);
                break;
        }
        List<Board> boards = pageBoards.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.boardsToBoardResponseDtos(boards),pageBoards),HttpStatus.OK);
    }

    @GetMapping("/Qna")
    public ResponseEntity getQnaBoards(@RequestParam(defaultValue = "1") int page,
                                        @Positive @RequestParam(defaultValue = "10") int size,
                                        @RequestParam String sorting){
        Slice<Board> pageBoards = null;
        switch (sorting){
            case "createdAt":
                pageBoards = boardService.findBoardsByCreatedAt("QNA",page-1, size);
                break;
            case "viewCount":
                pageBoards = boardService.findBoardsByViewCount("QNA", page-1, size);
                break;
            case "likes":
                pageBoards = boardService.findBoardsByLikes("QNA", page-1, size);
                break;
            case "comments":
                pageBoards = boardService.findBoardsByComments("QNA", page-1, size);
                break;
        }
        List<Board> boards = pageBoards.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.boardsToBoardResponseDtos(boards),pageBoards),HttpStatus.OK);
    }

    @GetMapping("/Qna/FAQ")
    public ResponseEntity getFaqBoards(@RequestParam(defaultValue = "1") int page,
                                        @Positive @RequestParam(defaultValue = "10") int size,
                                        @RequestParam String sorting){
        Slice<Board> pageBoards = null;
        switch (sorting){
            case "createdAt":
                pageBoards = boardService.findBoardsByCreatedAt("FAQ",page-1, size);
                break;
            case "viewCount":
                pageBoards = boardService.findBoardsByViewCount("FAQ", page-1, size);
                break;
            case "likes":
                pageBoards = boardService.findBoardsByLikes("FAQ", page-1, size);
                break;
            case "comments":
                pageBoards = boardService.findBoardsByComments("FAQ", page-1, size);
                break;
        }
        List<Board> boards = pageBoards.getContent();
        return new ResponseEntity<>(
                new MultiResponseDto<>(mapper.boardsToBoardResponseDtos(boards),pageBoards),HttpStatus.OK);
    }

    @DeleteMapping("/{board-id}")
    public ResponseEntity deleteBoard(@PathVariable("board-id") @Positive long boardId){
        boardService.deleteBoard(boardId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @PutMapping("/like")
    public ResponseEntity likeBoard(@RequestHeader("boardId") long boardId,
                                    @RequestHeader("Authorization") String Token) throws JsonProcessingException {
        Member writer = getWriterInJWTToken(Token);


        boardService.likesBoard(boardId, writer);
        return new ResponseEntity<>(HttpStatus.OK);
    }

//    // TODO: JWT 서비스 시에 삭제할 것.
//    @PutMapping("/like")
//    public ResponseEntity likeBoard(@RequestHeader("boardId") long boardId,
//                                    @RequestHeader("memberId") long memberId){
//
//
//
//        Optional<Member> optionalMember = memberRepository.findById(memberId);
//        Member findMember = optionalMember.orElseThrow(() ->
//                new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
//
//        boardService.likesBoard(boardId, findMember);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//

    // JWT 토큰을 해석하여 토큰 사용자를 알아내는 함수
    private Member getWriterInJWTToken(String token) throws JsonProcessingException {
        String[] chunks = token.split("\\.");

        Base64.Decoder decoder = Base64.getUrlDecoder();

        String payload = new String(decoder.decode(chunks[1]));

        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> returnMap = objectMapper.readValue(payload, Map.class);

        Object objectWriter = returnMap.get("sub");
        String email = objectWriter.toString();

        Optional<Member> member = memberRepository.findByEmail(email);
        Member writer = member.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return writer;
    }
}
