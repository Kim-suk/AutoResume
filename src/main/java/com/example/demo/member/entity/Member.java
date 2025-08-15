package com.example.demo.member.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username; // 로그인 ID

    @Column(nullable = false)
    private String password; // 암호화된 비밀번호

    private String name;     // 이름(실명)
    private String birth;    // 생년월일 (예: 20000131)
    private String gender;   // 성별 ("남자" 또는 "여자")
    private String email;    // 이메일
    private String phone;    // 휴대폰 번호
}
