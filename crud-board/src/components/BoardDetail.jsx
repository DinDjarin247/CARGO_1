import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // useParams 추가

function BoardDetail() {
  const { id } = useParams(); // useParams 훅을 사용하여 게시글 id 가져오기
  const [board, setBoard] = useState(null);

  useEffect(() => {
    // 게시글 id에 해당하는 데이터를 불러오는 함수
    const fetchBoard = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/boards/${id}` // id 변수 사용
        );
        setBoard(response.data);
      } catch (error) {
        console.error("Error fetching board:", error);
      }
    };

    fetchBoard(); // 컴포넌트가 마운트될 때 데이터를 불러옴

    // cleanup 함수를 사용하여 컴포넌트가 언마운트될 때 이후의 불필요한 호출을 방지함
    return () => {
      setBoard(null); // 상태 초기화
    };
  }, [id]); // 게시글 id가 변경될 때마다 useEffect 호출

  if (!board) {
    return <div>Loading...</div>; // 데이터 로딩 중일 때 표시할 내용
  }

  // 게시글 데이터를 표시하는 JSX
  return (
    <div>
      <h2>{board.title}</h2>
      <p>{board.content}</p>
    </div>
  );
}

export default BoardDetail;
