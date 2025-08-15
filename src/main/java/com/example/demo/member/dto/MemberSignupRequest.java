package com.example.demo.member.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MemberSignupRequest {
    private String username;
    private String password;
    private String name;
    private String birth;
    private String gender;
    private String email;
    private String phone;
}
