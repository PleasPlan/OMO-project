package com.OmObe.OmO.Board.controller;

import com.OmObe.OmO.Board.dto.BoardDto;
import com.OmObe.OmO.Board.entity.Board;
import com.OmObe.OmO.Board.mapper.BoardMapper;
import com.OmObe.OmO.Board.service.BoardService;
import com.OmObe.OmO.exception.BusinessLogicException;
import com.OmObe.OmO.exception.ExceptionCode;
import com.OmObe.OmO.member.entity.Member;
import com.OmObe.OmO.member.repository.MemberRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.Base64;
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

    public BoardController(BoardService boardService, BoardMapper mapper, MemberRepository memberRepository) {
        this.boardService = boardService;
        this.mapper = mapper;
        this.memberRepository = memberRepository;
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
                                     @RequestHeader("Authorization") String Token){
        Board board = mapper.boardPostDtoToBoard(postDto);
        Member writer = getWriterInJWTToken(Token);
        board.setMember(writer);

        Board response = boardService.createBoard(board);
        return new ResponseEntity<>(mapper.boardToBoardResponseDto(response),
                HttpStatus.CREATED);
    }

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
        Board board = boardService.findBoard(boardId);

        return new ResponseEntity<>(mapper.boardToBoardResponseDto(board),
                HttpStatus.OK);
    }

    @DeleteMapping("/{board-id}")
    public ResponseEntity deleteBoard(@PathVariable("board-id") @Positive long boardId){
        boardService.deleteBoard(boardId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    

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
