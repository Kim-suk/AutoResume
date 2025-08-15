package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class AutoResumeApplication {

	public static void main(String[] args) {
		SpringApplication.run(AutoResumeApplication.class, args);
	}
	   @GetMapping("/")
	    public String index() {
	        return "index";  // React를 정적 리소스로 연동 시 index.html 렌더
	    }
}
