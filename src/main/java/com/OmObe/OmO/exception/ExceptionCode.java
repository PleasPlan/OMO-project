package com.OmObe.OmO.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found. Please check the member ID and try again."),
    EMAIL_ALREADY_EXIST(404, "This Email is already exist. Please check the email"),
    NICKNAME_ALREADY_EXIST(404, "This Email is already exist. Please check the nickname"),
    PASSWORD_NOT_CORRECT(404, "Password is not correct. Pleas check the password");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int status, String message) {
        this.status = status;
        this.message = message;
    }
}

