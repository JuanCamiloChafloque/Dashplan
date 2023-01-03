package com.example.dashplan.config;

public class SecurityConstants {
    public static final String SIGN_UP_URLS = "/api/users/**";
    public static final String H2_URL = "h2-console/**";
    public static final String SECRET_KEY = "SecretKeyToGenerateAJWTokenKeySecretKeyToGenerateAJWTokenKeySecretKeyToGenerateAJWTokenKeySecretKeyToGenerateAJWTokenKeySecretKeyToGenerateAJWTokenKeySecretKeyToGenerateAJWTokenKey";
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 60 * 60 * 1000;
}
