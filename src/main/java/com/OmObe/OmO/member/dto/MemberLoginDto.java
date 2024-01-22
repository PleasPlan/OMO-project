package com.OmObe.OmO.member.dto;

import com.OmObe.OmO.member.entity.Member;
import lombok.*;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MemberLoginDto { // 클라이언트의 인증 정보를 수신하는 loginDto
    @NotBlank
    private String email;

    @NotBlank
    private Member.MemberRole memberRole;
}
