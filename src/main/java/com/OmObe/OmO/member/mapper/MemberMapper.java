package com.OmObe.OmO.member.mapper;

import com.OmObe.OmO.auth.oauth.dto.OAuthToken;
import com.OmObe.OmO.member.dto.MemberDto;
import com.OmObe.OmO.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    // MemberDto.Post -> Member
    // 자동 매핑하면 mbti만 저장되지 않아서 수동으로 매핑
    default Member memberPostDtoToMember(MemberDto.Post post){
        Member member = new Member();
//        member.setEmail(post.getEmail());
//        member.setPassword(post.getPassword());
        member.setBirthYear(post.getBirthYear());
        member.setBirthMonth(post.getBirthMonth());
        member.setBirthDay(post.getBirthDay());
        member.setNickname(post.getNickname());
        member.setMbit(post.getMbti());
        member.setGender(post.getGender());
        member.setClause(post.getClause());
        return member;
    }

}
