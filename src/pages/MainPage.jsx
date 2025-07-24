// src/pages/MainPage.jsx

import React from "react";
import '../index.css';  // Tailwind 기본 스타일 (필수)
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-white text-gray-800 font-sans">
      
      {/* 헤더 */}
      <header className="fixed top-0 left-0 w-full p-4 bg-white shadow-md flex justify-between items-center z-50">
        <h1 className="text-2xl font-extrabold text-blue-600 tracking-wide">AutoResume</h1>
        <nav className="space-x-4">
          <Link to="/login" className="px-4 py-2 text-blue-600 hover:text-blue-800 transition">로그인</Link>
          <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">회원가입</Link>
        </nav>
      </header>
      
      {/* 메인 콘텐츠 */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 mt-24 max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold mt-10 mb-6 leading-tight text-gray-900 animate-fadeIn">
          AI 기반 이력서 자동 작성
        </h2>
        <p className="text-lg text-gray-700 mb-10 animate-fadeIn delay-100">
          다양한 기업 양식에 맞춰 자동 완성되는 스마트 이력서 서비스!
        </p>
        <Link
          to="/resume"
          className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 shadow-md transition animate-fadeIn delay-200"
          aria-label="이력서 작성 시작하기"
        >
          이력서 작성 시작하기 →
        </Link>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <FeatureCard title="파일 업로드" desc="PDF, Word, HWP 지원" />
          <FeatureCard title="기업 양식 지원" desc="삼성/현대/네이버 등" />
          <FeatureCard title="자동 저장" desc="클라우드 기반 자동 저장" />
        </div>
      </main>

      {/* 푸터 */}
      <footer className="w-full p-6 text-center text-sm text-gray-500 bg-gray-50 border-t mt-20">
        ⓒ 2025 AutoResume. 고객센터 | 이용약관 | 개인정보처리방침
      </footer>
    </div>
  );
};

const FeatureCard = ({ title, desc }) => (
  <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1 duration-300">
    <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

export default MainPage;
