package com.example.demo.member.controller;

import com.example.demo.member.dto.LoginRequest;
import com.example.demo.member.dto.MemberSignupRequest;
import com.example.demo.member.entity.Member;
import com.example.demo.member.service.MemberService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController  // @Controller + @ResponseBody 역할
@RequestMapping("/api/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody MemberSignupRequest dto) {
        // DTO → 엔티티 변환
        Member member = Member.builder()
            .username(dto.getUsername())
            .password(dto.getPassword())
            .name(dto.getName())
            .birth(dto.getBirth())
            .gender(dto.getGender())
            .email(dto.getEmail())
            .phone(dto.getPhone())
            .build();

        boolean success = memberService.register(member);

        if (success) {
            return ResponseEntity.ok(Map.of("success", true, "message", "회원가입 성공"));
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("success", false, "message", "이미 존재하는 아이디입니다."));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest request) {
        Map<String, Object> result = memberService.login(request);

        if (Boolean.TRUE.equals(result.get("success"))) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(result);
        }
    }
}
