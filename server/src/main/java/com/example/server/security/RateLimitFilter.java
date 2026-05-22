package com.example.server.security;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimitFilter extends OncePerRequestFilter {
//    OncePerRequestFilter: spring guarantees one exec per req

//    IP -> bucket
    private final Map<String, Bucket> cache = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

//        get client IP
        String ip = request.getRemoteAddr();

//        get/craete bucket
        if (!cache.containsKey(ip)) {
            cache.put(ip, newBucket(ip));
        }
        Bucket bucket = cache.get(ip);

//        consume token if succ continue else limit reached
        if (bucket.tryConsume(1)) {
            filterChain.doFilter(request, response); //passes req to next
        } else {
            response.setStatus(429);
            response.getWriter().write("Too many requests");
        }
    }

    private Bucket newBucket(String ip) {

        Bandwidth burst = Bandwidth.classic(
                30,
                Refill.greedy(30, Duration.ofSeconds(10))
        );

        Bandwidth sustained = Bandwidth.classic(
                300,
                Refill.greedy(300, Duration.ofMinutes(1))
        );

        return Bucket.builder()
                .addLimit(burst)
                .addLimit(sustained)
                .build();
    }
}
