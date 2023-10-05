package com.OmObe.OmO.auth.oauth.dto;

import lombok.Data;

@Data
public class OAuthToken { // OAuth2 로그인 dto
    private String access_token;
    private String token_type;
    private String refresh_token;
    private int expires_in;
    private String scope;
    private int refresh_token_expires_in;
}
