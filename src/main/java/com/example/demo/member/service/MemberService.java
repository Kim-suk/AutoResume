package com.example.demo.member.service;

import com.example.demo.common.jwt.JwtUtil;
import com.example.demo.member.dto.LoginRequest;
import com.example.demo.member.entity.Member;
import com.example.demo.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public boolean register(Member member) {
        // username 중복 체크
        if (memberRepository.existsByUsername(member.getUsername())) {
            return false; // 이미 존재
        }
        // 비밀번호 암호화
        member.setPassword(passwordEncoder.encode(member.getPassword()));

        memberRepository.save(member);
        return true;
    }

    public Map<String, Object> login(LoginRequest request) {
        Map<String, Object> result = new HashMap<>();
        Member member = memberRepository.findByUsername(request.getId())
                .orElse(null);

        if (member != null && passwordEncoder.matches(request.getPwd(), member.getPassword())) {
            String token = jwtUtil.generateToken(member.getUsername());
            result.put("success", true);
            result.put("token", token);
        } else {
            result.put("success", false);
            result.put("message", "아이디 또는 비밀번호가 올바르지 않습니다.");
        }
        return result;
    }
}
