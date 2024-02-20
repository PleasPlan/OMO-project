package com.OmObe.OmO.member.mapper;

import com.OmObe.OmO.member.dto.MemberDto;
import com.OmObe.OmO.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    // MemberDto.Post -> Member
    Member memberPostDtoToMember(MemberDto.Post post);

    // MemberDto.ProfileImagePatch -> Member
    Member profileImagePatchDtoToMember(MemberDto.ProfileImagePatch patch);

    // MemberDto.NicknamePatch -> Member
    Member nicknamePatchDtoToMember(MemberDto.NicknamePatch patch);

    // MemberDto.MbtiPatch -> Member
    Member mbtiPatchDtoToMember(MemberDto.MbtiPatch patch);

}
