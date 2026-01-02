package com.ninehub.authentication.controller.advice;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.LockedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Map;

@Slf4j
@RestControllerAdvice
public class ApplicationControllerAdvice {

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(AccessDeniedException.class)
    public ProblemDetail accessDeniedException(AccessDeniedException exception) {
        log.error(exception.getMessage(), exception);
        return ProblemDetail.forStatusAndDetail(
                HttpStatus.FORBIDDEN,
                "You are not allowed to do this action"
        );
    }

    @ResponseStatus(HttpStatus.FORBIDDEN)
    @ExceptionHandler(IncorrectResultSizeDataAccessException.class)
    public ProblemDetail incorrectResultSizeException(IncorrectResultSizeDataAccessException exception) {
        log.error(exception.getMessage(), exception);
        return ProblemDetail.forStatusAndDetail(
                HttpStatus.FORBIDDEN,
                "Incorrect result size"
        );
    }

    @ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
    @ExceptionHandler(LockedException.class)
    public ProblemDetail lockedException(LockedException exception) {
        log.error(exception.getMessage(), exception);
        return ProblemDetail.forStatusAndDetail(
                HttpStatus.NOT_ACCEPTABLE,
                "Your account is locked. Please enter your OTP or contact administrator."
        );
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(BadCredentialsException.class)
    public ProblemDetail badCredentialsException(BadCredentialsException exception) {
        log.error(exception.getMessage(), exception);
        ProblemDetail problemDetail =
                ProblemDetail.forStatusAndDetail(HttpStatus.UNAUTHORIZED, "Bad credentials");
        problemDetail.setProperty("error", "We could not authenticate you");
        return problemDetail;
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler({MalformedJwtException.class, SignatureException.class})
    public ProblemDetail jwtSignatureException(Exception exception) {
        log.error(exception.getMessage(), exception);
        return ProblemDetail.forStatusAndDetail(
                HttpStatus.UNAUTHORIZED,
                "Invalid JWT token"
        );
    }

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @ExceptionHandler(ExpiredJwtException.class)
    public ProblemDetail expiredJwtException(Exception exception) {
        log.error(exception.getMessage(), exception);
        return ProblemDetail.forStatusAndDetail(
                HttpStatus.UNAUTHORIZED,
                "JWT token is expired"
        );
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> globalExceptionHandler(Exception ex, HttpServletRequest request) {
        log.error("Unhandled exception", ex);

        Map<String, String> body = Map.of(
                "status", "error",
                "message", ex.getMessage() != null ? ex.getMessage() : "An unexpected error occurred"
        );

        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(body);
    }
}
