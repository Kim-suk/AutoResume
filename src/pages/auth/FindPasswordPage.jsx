import React from "react";

const FindPasswordPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">비밀번호 찾기</h2>
        <p className="text-center text-gray-600">가입한 아이디와 이메일로 비밀번호를 재설정하세요.</p>
      </div>
    </div>
  );
};

export default FindPasswordPage;
