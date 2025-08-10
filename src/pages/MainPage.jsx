import React, { useState, useEffect } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import Layout from "./common/Layout";

const partnerSites = [
  {
    name: "잡코리아",
    url: "https://www.jobkorea.co.kr",
    image: "/images/jobkorea.png"
  },
  {
    name: "알바몬",
    url: "https://www.albamon.com",
    image: "/images/albamon.png"
  },
  {
    name: "사람인",
    url: "https://www.saramin.co.kr",
    image: "/images/saramin.png"
  },
  {
    name: "잡플래닛",
    url: "https://www.jobplanet.co.kr",
    image: "/images/jobplanet.png"
  },
  {
    name: "캔바",
    url: "https://www.canva.com",
    image: "/images/canva.png"
  },
  {
    name: "점핏",
    url: "https://www.jumpit.co.kr",
    image: "/images/jumpit.png"
  },
  {
    name: "알바천국",
    url: "https://www.alba.co.kr",
    image: "/images/alba.png"
  }
];

const interviewVideos = [
  { id: 1, url: "https://www.youtube.com/embed/dQw4w9WgXcQ", title: "면접 팁 1" },
  { id: 2, url: "https://www.youtube.com/embed/5NV6Rdv1a3I", title: "면접 팁 2" },
  { id: 3, url: "https://www.youtube.com/embed/3JZ_D3ELwOQ", title: "면접 팁 3" },
  { id: 4, url: "https://www.youtube.com/embed/fJ9rUzIMcZQ", title: "면접 팁 4" },
  { id: 5, url: "https://www.youtube.com/embed/tAGnKpE4NCI", title: "면접 팁 5" },
  { id: 6, url: "https://www.youtube.com/embed/kXYiU_JCYtU", title: "면접 팁 6" },
];

const InterviewVideoSlider = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [videos.length]);

  const visibleVideos = [];
  for (let i = 0; i < 4; i++) {
    visibleVideos.push(videos[(currentIndex + i) % videos.length]);
  }

  return (
    <section className="w-full max-w-6xl mt-20 mb-12 mx-auto">
      <h3 className="text-2xl font-semibold mb-6 text-center">면접 추천 영상</h3>
      <div className="flex gap-6 overflow-hidden justify-center">
        {visibleVideos.map((video) => (
          <div key={video.id} className="aspect-video rounded-lg overflow-hidden shadow-lg flex-shrink-0 w-[23%]">
            <iframe
              src={video.url}
              title={video.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

const FeatureCard = ({ title, desc }) => (
  <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1 duration-300">
    <h3 className="text-xl font-semibold mb-3 text-gray-800">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

const MainPage = () => {
  const [adVisible, setAdVisible] = useState(true);
  const [adContent, setAdContent] = useState(null);

  const adHeight = 80;
  const headerHeight = 64;

  useEffect(() => {
    async function fetchAd() {
      try {
        const res = await fetch("/api/advertisement");
        if (!res.ok) throw new Error("광고 불러오기 실패");
        const data = await res.json();
        if (data && data.message) {
          setAdContent(data.message);
        } else {
          setAdContent("광고 준비 중입니다.");
        }
      } catch (error) {
        console.error("광고 로드 실패:", error);
        setAdContent("광고 준비 중입니다.");
      }
    }
    fetchAd();
  }, []);

  return (
    <Layout>
      {/* 광고 배너 */}
      {adVisible && (
        <div
          className="fixed top-0 left-0 w-full bg-gray-300 p-3 flex justify-between items-center shadow z-50"
          style={{ height: adHeight }}
        >
          <span className="font-semibold text-sm">{adContent || "광고 준비 중입니다."}</span>
          <button onClick={() => setAdVisible(false)} className="font-bold text-xl hover:text-gray-700">×</button>
        </div>
      )}

      {/* 헤더 */}
      <header
        className="fixed left-0 w-full p-4 bg-white shadow-md flex justify-between items-center z-40"
        style={{ top: adVisible ? adHeight : 0 }}
      >
        <h1 className="text-2xl font-extrabold text-blue-600 tracking-wide">AutoResume</h1>
        <nav className="space-x-4">
          <Link to="/login" className="px-4 py-2 text-blue-600 hover:text-blue-800 transition">로그인</Link>
          <Link to="/signup" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">회원가입</Link>
        </nav>
      </header>

      {/* 파트너 아이콘 (고정 아님, 헤더 바로 아래 우측 상단) */}
      <div
        className="absolute right-4 flex gap-3 items-center mt-1"
        style={{ top: (adVisible ? adHeight : 0) + headerHeight }}
      >
        {partnerSites.map((site) => (
          <a
            key={site.name}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            title={site.name}
            className="w-12 h-12 rounded-full overflow-hidden shadow hover:opacity-80 transition bg-white border flex items-center justify-center"
          >
            <img
              src={site.image}
              alt={site.name}
              className="w-10 h-10 object-contain"
            />
          </a>
        ))}
      </div>

      {/* 메인 컨텐츠 */}
      <main
        className="flex-grow flex flex-col items-center justify-center text-center px-6 max-w-4xl mx-auto"
        style={{ marginTop: adVisible ? adHeight + headerHeight + 56 : headerHeight + 56 }}
      >
        <h2 className="text-4xl font-extrabold mt-10 mb-6 leading-tight text-gray-900 animate-fadeIn">
          AI 기반 이력서 자동 작성
        </h2>
        <p className="text-lg text-gray-700 mb-10 animate-fadeIn delay-100">
          다양한 기업 양식에 맞춰 자동 완성되는 스마트 이력서 서비스!
        </p>
        <Link
          to="/resume"
          className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 shadow-md transition animate-fadeIn delay-200"
        >
          이력서 작성 시작하기 →
        </Link>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          <FeatureCard title="파일 업로드" desc="PDF, Word, HWP 지원" />
          <FeatureCard title="기업 양식 지원" desc="삼성/현대/네이버 등" />
          <FeatureCard title="자동 저장" desc="클라우드 기반 자동 저장" />
        </div>
      </main>

      {/* 면접 추천 영상 슬라이더 */}
      <InterviewVideoSlider videos={interviewVideos} />
    </Layout>
  );
};

export default MainPage;
