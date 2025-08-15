// src/main/java/com/example/demo/member/dto/LoginRequest.java
package com.example.demo.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class LoginRequest {
    private String id;  // React에서 id로 보냄
    private String pwd; // React에서 pwd로 보냄
}
