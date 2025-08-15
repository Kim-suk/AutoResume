package com.example.demo.common.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {
    // 최소 256비트(32바이트) 이상의 키로 설정해야 함
    private final String SECRET_KEY = "my-secret-key-my-secret-key-my-secret!"; 

    // SecretKey 객체 생성 (byte[]로 변환 후 Keys.hmacShaKeyFor() 사용)
    private final SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

    private final long EXPIRATION = 1000 * 60 * 60; // 1시간

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION))
                .signWith(key, SignatureAlgorithm.HS256) // 변경된 API
                .compact();
    }

    public String validateToken(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(key)  // 변경된 API
                    .build()
                    .parseClaimsJws(token)
                    .getBody()
                    .getSubject();
        } catch (JwtException e) {
            // 토큰 검증 실패시 null 반환
            return null;
        }
    }
}
