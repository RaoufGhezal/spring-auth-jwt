package com.example.server.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component// filters/helpers
public class JwtAuthFilter extends OncePerRequestFilter {
    @Value("${jwt.secret}")
    private String secret; // get secret from application.properties

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        //extract token from cookies
        String token = extCookie(request, "accessToken");

        if(token==null){
            filterChain.doFilter(request, response);
            return;
        }

        try{
            Claims cl = Jwts.parser()
                    .setSigningKey(secret)// used to verify jwt signature
                    .parseClaimsJws(token)// validate token
                    .getBody(); // get payload

            Number userIdClaim = cl.get("userId", Number.class); // read userId payload from token
            Number sessionIdClaim = cl.get("sessionId", Number.class);

            if (userIdClaim == null || sessionIdClaim == null) {
                throw new IllegalArgumentException("Missing token claims"); // throw exception
            }

            Long userId = userIdClaim.longValue();// convert to long
            Long sessionId = sessionIdClaim.longValue();

            request.setAttribute("userId", userId); // sotr in HTTP req
            request.setAttribute("sessionId", sessionId);

            // create springs security auth
            Authentication auth = new UsernamePasswordAuthenticationToken(userId, null, null);
            SecurityContextHolder.getContext().setAuthentication(auth);// store it in security_context ,so spring security rules can work
        }catch (Exception e){
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid access token");
            return;
        }

        filterChain.doFilter(request, response);
    }

    private String extCookie(HttpServletRequest request, String name){
        if(request.getCookies()==null) return null;

        for(Cookie c : request.getCookies()){
            if(c.getName().equals(name)){
                return c.getValue();
            }
        }
        return null;
    }
}
