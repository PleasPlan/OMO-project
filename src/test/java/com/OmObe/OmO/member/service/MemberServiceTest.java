package com.OmObe.OmO.member.service;

import com.OmObe.OmO.exception.BusinessLogicException;
import com.OmObe.OmO.member.dto.MemberDto;
import com.OmObe.OmO.member.entity.Member;
import com.OmObe.OmO.member.repository.MemberRepository;
import com.google.gson.Gson;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
class MemberServiceTest {
    @Mock
    private MemberRepository memberRepository;

    @InjectMocks
    private MemberService memberService;

    @Test
    @DisplayName("createMember() - checkPassword 테스트")
    public void checkPassword(){
        // given
        MemberDto.Post post = new MemberDto.Post("seung@yahoo.com", "hong"
                , "a1234", "a12341", 1999, 7, 11, 111, 1, true);

        // when / then
        Assertions.assertThat(post.getCheckPassword()).isNotEqualTo(post.getPassword());
    }



}