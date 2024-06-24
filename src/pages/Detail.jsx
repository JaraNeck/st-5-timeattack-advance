import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { todoApi } from "../api/todos";
import axios from "axios";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // TODO: useQuery 로 리팩터링 하세요.

  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState(null);
  // const [data, setData] = useState(null);

  const fetchDetail = async () => {
    const response = await todoApi.get(`/todos/${id}`);
    return response.data;
  };

  const {
    data: todos,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["todos", id],
    queryFn: fetchDetail,
  });

  console.log(data); // undefined
  console.log(todos); // undefined

  if (isPending) {
    alert("데이터로딩중");
  }

  if (isError) {
    alert("오류!");
  }
  // if (isLoading) return <div style={{ fontSize: 36 }}>로딩중...</div>;
  // if (error) {
  //   console.error(error);
  //   return (
  //     <div style={{ fontSize: 24 }}>에러가 발생했습니다: {error.message}</div>
  //   );
  // }

  return (
    <div>
      <button onClick={() => navigate("/")}>홈으로 이동</button>
      <p>제목: {data.title}</p>
      <p>내용: {data.contents}</p>
      <p>작성일자: {new Date(data.createdAt).toDateString()}</p>
    </div>
  );
}
