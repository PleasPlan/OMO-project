package com.OmObe.OmO.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found. Please check the member ID and try again."),
    EMAIL_ALREADY_EXIST(404, "This Email is already exist. Please check the email"),
    NICKNAME_ALREADY_EXIST(404, "This Email is already exist. Please check the nickname"),
    BOARD_NOT_FOUND(404,"Missing Board"),
    COMMENT_NOT_FOUND(404,"Missing Comment"),
    PASSWORD_NOT_CORRECT(404, "Password is not correct. Pleas check the password"),
    INVALID_TOKEN(403, "This Token is invalid token. Please check the token");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}

