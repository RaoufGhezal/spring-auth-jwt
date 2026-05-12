package com.example.server.dto.response;

import lombok.Getter;

@Getter
public class UserResponse { // safe object sent to front end (-password)
    private Long id;
    private String name;
    private String email;

    public UserResponse(
            Long id,
            String name,
            String email
    ){
        this.id = id;
        this.name = name    ;
        this.email=email;
    }
}
