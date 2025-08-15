import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../common/Footer"; // 공통 Footer 컴포넌트

const QnACenter = () => {
  const tabs = ["회원가입∙정보", "이력서 관리∙활용", "입사지원", "기타"];
  const [activeTab, setActiveTab] = useState("회원가입∙정보");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  // 광고 상태
  const [sideAd, setSideAd] = useState(null);
  const [bannerAd, setBannerAd] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // FAQ 게시글 로딩 (activeTab에 따라 동적)
    axios
      .get(`/api/qa?category=${encodeURIComponent(activeTab)}`)
      .then((res) => setPosts(res.data))
      .catch(() => setError("게시글을 불러오는 중 오류가 발생했습니다."))
      .finally(() => setLoading(false));

    // 광고 불러오기 (동적)
    axios
      .get("/api/ads/side")
      .then((res) => setSideAd(res.data))
      .catch(() => setSideAd(null));

    axios
      .get("/api/ads/banner")
      .then((res) => setBannerAd(res.data))
      .catch(() => setBannerAd(null));
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-between">
      {/* Header */}
      <header className="bg-white shadow p-6 flex justify-center">
        <input
          type="text"
          placeholder="궁금한 내용을 검색하세요"
          className="w-2/3 px-6 py-3 border border-gray-300 rounded text-lg"
          // (필요하면 검색어 엔터 처리 로직 추가 가능)
        />
      </header>

      {/* Main */}
      <div className="flex max-w-7xl mx-auto mt-6 px-4 flex-grow">
        {/* 왼쪽 사이드바 */}
        <aside className="w-72 bg-white p-8 shadow rounded mr-6">
          <h1 className="text-2xl font-bold mb-6">고객센터</h1>
          <ul className="space-y-4 text-lg font-medium">
            <li className="hover:underline cursor-pointer">문의∙신고</li>
            <li className="hover:underline cursor-pointer">채팅상담</li>
            <li className="hover:underline cursor-pointer">공지사항</li>
            <li className="hover:underline cursor-pointer">이벤트∙혜택</li>
            <li className="hover:underline cursor-pointer">아이디∙비밀번호 찾기</li>
            <li className="hover:underline cursor-pointer">회원탈퇴</li>
          </ul>
        </aside>

        {/* 콘텐츠 */}
        <main className="flex-1 bg-white p-8 shadow rounded">
          {/* FAQ 타이틀 + 검색 */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">FAQ</h2>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="FAQ 검색"
              className="w-64 px-4 py-2 border border-gray-300 rounded"
            />
          </div>

          {/* 탭 (정적) */}
          <div className="flex space-x-3 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-base ${
                  activeTab === tab
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 글쓰기 버튼 */}
          <div className="text-right mb-4">
            <Link
              to="/qa/write"
              className="px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
            >
              문의 글 작성
            </Link>
          </div>

          {/* 게시글 목록 */}
          {loading ? (
            <p>로딩중...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="w-full border text-base">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">번호</th>
                  <th className="border px-4 py-2">제목</th>
                  <th className="border px-4 py-2">날짜</th>
                </tr>
              </thead>
              <tbody>
                {posts
                  .filter((post) =>
                    post.title.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((post) => (
                    <tr
                      key={post.id}
                      className="hover:bg-gray-50 cursor-pointer"
                    >
                      <td className="border px-4 py-2 text-center">{post.id}</td>
                      <td className="border px-4 py-2">
                        <Link
                          to={`/qa/${post.id}`}
                          className="text-blue-600 hover:underline"
                        >
                          {post.title}
                        </Link>
                      </td>
                      <td className="border px-4 py-2 text-center">
                        {post.createdAt?.slice(0, 10)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </main>

        {/* 오른쪽 광고 사이드바 */}
        <aside className="w-52 ml-6 hidden lg:block">
          <div className="bg-white shadow rounded p-4 h-full flex items-center justify-center">
            {sideAd ? (
              <a
                href={sideAd.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full block"
              >
                <img
                  src={sideAd.imageUrl}
                  alt={sideAd.alt || "광고"}
                  className="w-full h-[600px] object-cover rounded"
                />
              </a>
            ) : (
              <div className="w-full h-[600px] bg-gray-200 flex items-center justify-center text-gray-600 text-sm">
                광고 영역
              </div>
            )}
          </div>
        </aside>
      </div>

      {/* 푸터 위 가로 광고 배너 */}
      {bannerAd && (
        <div className="w-full max-w-7xl mx-auto px-4 my-10">
          <a href={bannerAd.link} target="_blank" rel="noopener noreferrer">
            <img
              src={bannerAd.imageUrl}
              alt={bannerAd.alt || "광고"}
              className="w-full h-28 object-cover rounded shadow"
            />
          </a>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-12">
        <Footer />
      </footer>
    </div>
  );
};

export default QnACenter;
