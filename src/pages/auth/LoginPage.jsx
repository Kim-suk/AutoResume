import axios from "axios"; 
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../common/Layout";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");   // 비밀번호 상태 추가
  const [rememberId, setRememberId] = useState(false);

  // 쿠키 처리
  useEffect(() => {
    const savedId = getCookie("savedId");
    if (savedId) {
      setUsername(savedId);
      setRememberId(true);
    }
  }, []);

  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const getCookie = (name) => {
    const cookies = document.cookie.split(";");
    for (let c of cookies) {
      const [key, val] = c.trim().split("=");
      if (key === name) return val;
    }
    return "";
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (rememberId) {
      setCookie("savedId", username, 7);
    } else {
      setCookie("savedId", "", -1);
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/member/login",
        {
          id: username,
          pwd: password,
        }
      );

      if (response.data.success) {
        alert("로그인 성공!");
        // JWT 토큰을 로컬스토리지에 저장 (추후 인증 API 호출시 사용)
        localStorage.setItem("token", response.data.token);
        window.location.href = "/";
      } else {
        alert(response.data.message || "로그인 실패");
      }
    } catch (error) {
      console.error(error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-60 flex items-center justify-center px-4 py-8 relative">
        {/* 상단 우측 링크 */}
        <div className="absolute top-4 right-6 text-xs text-gray-500 space-x-3">
          <Link to="/" className="hover:underline">
            홈
          </Link>
          <span>|</span>
          <Link to="/qa" className="hover:underline">
            고객센터
          </Link>
        </div>

        {/* 로그인 박스 */}
        <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
            로그인
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="NO.1 ·이력서· 통합 ID"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="비밀번호"
              value={password}                      
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-lg"
            >
              로그인
            </button>

            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberId}
                  onChange={() => setRememberId(!rememberId)}
                  className="mr-2"
                />
                로그인 유지
              </label>
              <div className="flex items-center gap-1">
                <span>IP보안</span>
                <span className="text-blue-600 font-bold border border-blue-600 rounded-full px-2 text-xs">
                  ON
                </span>
              </div>
            </div>
          </form>

          <div className="border-t my-6" />

          {/* 소셜 로그인 버튼들 */}
          <div className="flex justify-center gap-4 mb-4">
            <button className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full text-white font-bold">
              N
            </button>
            <button className="w-10 h-10 bg-yellow-300 hover:bg-yellow-400 rounded-full text-black font-bold">
              K
            </button>
            <button className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-bold">
              f
            </button>
            <button className="w-10 h-10 bg-white border hover:bg-gray-100 rounded-full text-gray-700 font-bold">
              G
            </button>
            <button className="w-10 h-10 bg-black hover:bg-gray-900 rounded-full text-white font-bold">
              
            </button>
          </div>

          {/* 링크들 */}
          <div className="text-sm text-center text-gray-600 space-x-3">
            <Link to="/find-id" className="hover:underline">
              아이디 찾기
            </Link>
            <span>|</span>
            <Link to="/find-password" className="hover:underline">
              비밀번호 찾기
            </Link>
            <span>|</span>
            <Link to="/signup" className="hover:underline text-blue-600 font-medium">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default LoginPage;
