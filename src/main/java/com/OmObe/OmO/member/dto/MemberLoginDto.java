package com.OmObe.OmO.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
public class MemberLoginDto { // 클라이언트의 인증 정보를 수신하는 loginDto
    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
