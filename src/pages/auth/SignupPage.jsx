import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../common/Layout";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "", 
    password: "",
    name: "",
    birth: "",  // 반드시 숫자 문자열로 입력 (ex: 19900101)
    gender: "",
    email: "",
    phone: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [checkAll, setCheckAll] = useState(false);
  const [agreements, setAgreements] = useState({
    over15: false,
    terms: false,
    personal: false,
    ads: false,
  });

  // 회원가입 요청시 Authorization 헤더 제거하기 (만약 axios 인터셉터에서 기본 세팅된 경우)
  useEffect(() => {
    // axios 인터셉터 예시 (필요시만)
    const requestInterceptor = axios.interceptors.request.use((config) => {
      if (config.url && config.url.includes("/api/member/signup")) {
        // 회원가입 요청에는 Authorization 헤더 제거
        if (config.headers && config.headers.Authorization) {
          delete config.headers.Authorization;
        }
      }
      return config;
    });

    return () => {
      axios.interceptors.request.eject(requestInterceptor);
    };
  }, []);

  const handleCheckAll = () => {
    const newValue = !checkAll;
    setCheckAll(newValue);
    setAgreements({
      over15: newValue,
      terms: newValue,
      personal: newValue,
      ads: newValue,
    });
  };

  const handleAgreementChange = (key) => {
    const updated = { ...agreements, [key]: !agreements[key] };
    setAgreements(updated);
    setCheckAll(Object.values(updated).every(Boolean));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // birth 필드는 숫자만 입력받도록 필터링(선택 사항)
    if (name === "birth") {
      const filteredValue = value.replace(/\D/g, ""); // 숫자만
      setFormData((prev) => ({
        ...prev,
        [name]: filteredValue,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenderSelect = (gender) => {
    setFormData((prev) => ({
      ...prev,
      gender,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 필수 약관 체크
    if (!agreements.over15 || !agreements.terms) {
      alert("필수 약관에 동의해주세요.");
      return;
    }

    try {
      // 회원가입 요청
      const response = await axios.post(
        "http://localhost:8080/api/member/signup",
        formData,
        { withCredentials: true }  // CORS 인증 쿠키 등 필요 시 유지
      );

      if (response.data.success) {
        alert("회원가입 성공!");
        navigate("/login");
      } else {
        alert(response.data.message || "회원가입 실패");
      }
    } catch (error) {
      console.error("회원가입 에러:", error.response || error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center px-4 py-8 bg-gray-60 min-h-screen">
        <div className="absolute top-4 right-6 text-xs text-gray-500 space-x-3">
          <Link to="/" className="hover:underline">홈</Link>
          <span>|</span>
          <Link to="/qa" className="hover:underline">고객센터</Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 space-y-4"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            회원가입하고 다양한 혜택을 누리세요!
          </h2>

          <input
            type="text"
            name="username"
            placeholder="아이디 (통합 ID)"
            value={formData.id}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-md bg-gray-50"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="비밀번호 (8~16자의 영문, 숫자, 특수기호)"
              value={formData.password}
              onChange={handleChange}
              className="w-full border px-4 py-3 rounded-md bg-gray-50"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600"
            >
              {showPassword ? "숨기기" : "표시"}
            </button>
          </div>

          <input
            type="text"
            name="name"
            placeholder="이름 (실명)"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-md bg-gray-50"
            required
          />

          <div className="flex gap-2">
            <input
              type="text"
              name="birth"
              placeholder="생년월일 (예: 20000131)"
              value={formData.birth}
              onChange={handleChange}
              className="flex-1 border px-4 py-3 rounded-md bg-gray-50"
              required
              maxLength={8}
            />
            <button
              type="button"
              onClick={() => handleGenderSelect("M")}
              className={`w-1/4 border py-3 rounded-md hover:bg-blue-100 ${
                formData.gender === "M" ? "bg-blue-200" : ""
              }`}
            >
              남자
            </button>
            <button
              type="button"
              onClick={() => handleGenderSelect("F")}
              className={`w-1/4 border py-3 rounded-md hover:bg-pink-100 ${
                formData.gender === "F" ? "bg-pink-200" : ""
              }`}
            >
              여자
            </button>
          </div>

          <input
            type="email"
            name="email"
            placeholder="이메일"
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-4 py-3 rounded-md bg-gray-50"
            required
          />

          <div className="flex gap-2">
            <input
              type="tel"
              name="phone"
              placeholder="휴대폰번호"
              value={formData.phone}
              onChange={handleChange}
              className="flex-1 border px-4 py-3 rounded-md bg-gray-50"
              required
            />
            <button
              type="button"
              className="w-1/3 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium"
            >
              인증번호 전송
            </button>
          </div>

          {/* 약관 동의 */}
          <div className="mt-6 border rounded-md p-4 bg-gray-50 text-sm">
            <label className="flex items-center mb-2 font-medium">
              <input
                type="checkbox"
                checked={checkAll}
                onChange={handleCheckAll}
                className="mr-2"
              />
              필수항목 및 선택항목 전체 동의
            </label>

            <div className="space-y-2 ml-5">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={agreements.over15}
                  onChange={() => handleAgreementChange("over15")}
                  className="mr-2"
                  required
                />
                [필수] 만 15세 이상입니다
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={agreements.terms}
                  onChange={() => handleAgreementChange("terms")}
                  className="mr-2"
                  required
                />
                [필수] 이용약관 동의
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={agreements.personal}
                  onChange={() => handleAgreementChange("personal")}
                  className="mr-2"
                />
                [선택] 개인정보 수집 및 이용 동의
              </label>

              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={agreements.ads}
                  onChange={() => handleAgreementChange("ads")}
                  className="mr-2"
                />
                [선택] 광고성 정보 수신 동의
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-bold text-lg"
          >
            가입하기
          </button>

          <p className="text-xs text-center text-gray-500 mt-4">
            🐱 통합 ID 하나로 모든 서비스 이용 가능합니다.
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default SignupPage;
