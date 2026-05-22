package com.example.server.util;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secret; // get secret from application.properties

    public Map<String, String> generateToken(Long userId, Long sessionId){
        // Map<String, String>
        // key value collection {"accessToken":"", "refreshToken":""}
        Map<String, String> tokens = new HashMap<>();

//        access token
        String aToken = Jwts.builder()
            .claim("userId", userId)
            .claim("sessionId", sessionId) // add data inside token payload
            .setExpiration(new Date(System.currentTimeMillis() + 15 * 60 * 1000))
            .signWith(SignatureAlgorithm.HS256, secret)
            .compact();

//        refresh token
        String rToken = Jwts.builder()
            .claim("sessionId", sessionId)
            .setExpiration(new Date(System.currentTimeMillis() + 30L * 24 * 60 * 60 * 1000))
            .signWith(SignatureAlgorithm.HS256, secret)
            .compact();

        tokens.put("accessToken", aToken);
        tokens.put("refreshToken", rToken);

        return tokens;
    }

    public Claims parseToken(String token) {
        return Jwts.parser()
                .setSigningKey(secret)
                .parseClaimsJws(token)
                .getBody();
    }
}
