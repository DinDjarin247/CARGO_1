import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // BrowserRouter 추가
import BoardList from "./components/BoardList";
import Write from "./components/Write";
import BoardDetail from "./components/BoardDetail";
import BMI from "./BMI";

function App() {
  const [isModifyMode, setIsModifyMode] = useState(false);
  const [selectedBoardId, setSelectedBoardId] = useState(null);
  const [boardList, setBoardList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/boards")
      .then((response) => setBoardList(response.data))
      .catch((error) => console.error("Error fetching board list:", error));
  }, []);

  const handleModify = (boardId) => {
    setIsModifyMode(true);
    setSelectedBoardId(boardId);
  };

  const handleCancel = () => {
    setIsModifyMode(false);
    setSelectedBoardId(null);
  };

  return (
    <Router>
      {" "}
      {/* BrowserRouter로 감싸기 */}
      <div className="App">
        <h1>CRUD Board</h1>
        <Routes>
          <Route
            path="/"
            element={
              <BoardList
                isModifyMode={isModifyMode}
                selectedBoardId={selectedBoardId}
                handleModify={handleModify}
                handleCancel={handleCancel}
                boardList={boardList}
              />
            }
          />
          <Route path="/write" element={<Write />} />
          <Route path="/boards/:id" element={<BoardDetail />} />
        </Routes>
      </div>
      <Write />
    </Router>
  );
}

export default App;
