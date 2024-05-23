import React, { useState, useEffect } from "react";
import axios from "axios";

function BoardList({
  isModifyMode,
  selectedBoardId,
  handleModify,
  handleCancel,
}) {
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/boards")
      .then((response) => setBoardList(response.data))
      .catch((error) => console.error("Error fetching board list:", error));
  }, []);

  const handleClick = (boardId) => {
    if (isModifyMode && boardId === selectedBoardId) {
      handleCancel();
    } else {
      handleModify(boardId);
    }
  };

  return (
    <div>
      <h2>Board List</h2>
      <ul>
        {boardList.map((board) => (
          <li key={board.id} onClick={() => handleClick(board.id)}>
            <a href={`/boards/${board.id}`}>{board.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BoardList;
