import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const QnADetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/api/qa/${id}`)
      .then(res => setPost(res.data))
      .catch(() => setError("글을 불러오는 중 오류가 발생했습니다."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>로딩중...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!post) return <p>글이 존재하지 않습니다.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{post.title}</h2>
      <p className="mb-4 whitespace-pre-wrap">{post.content}</p>
      <p className="text-sm text-gray-500 mb-4">작성일: {post.createdAt?.slice(0,10)}</p>

      <Link
        to="/qa"
        className="inline-block px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        목록으로
      </Link>
    </div>
  );
};

export default QnADetail;
