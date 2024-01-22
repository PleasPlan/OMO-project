package com.OmObe.OmO.auth.utils;

import com.OmObe.OmO.member.entity.Member;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class MemberAuthorityUtils { // 회원의 권한 매핑 & 생성
    @Value("${mail.address.admin}")
    private String adminMailAddress; // 관리자 이메일

    // 관리자 권한
    private final List<String> ADMIN_ROLES_STRING = List.of("ADMIN", "USER");
    // 일반 사용자 권한
    private final List<String> USER_ROLES_STRING = List.of("USER");

    // db에 저장된 Role을 기반으로 권한 정보 생성
    public List<GrantedAuthority> createAuthorities(Member.MemberRole roles) {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + roles));
    }

    public List<String> createRoles(String email) {
        if (email.equals(adminMailAddress)) {
            return ADMIN_ROLES_STRING;
        }
        return USER_ROLES_STRING;
    }
}
