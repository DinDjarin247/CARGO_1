import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Axios from "axios";

const Write = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = () => {
    Axios.post("http://localhost:8000/boards", { title, content })
      .then((res) => {
        console.log("글 작성이 성공적으로 완료되었습니다.");
        // 성공적으로 작성한 후 필요한 작업을 수행할 수 있습니다.
        // 예를 들어, 작성한 글을 다시 불러와서 화면에 표시할 수 있습니다.
        window.location.reload();
      })
      .catch((error) => {
        console.error("글 작성 중 오류가 발생했습니다:", error);
      });
  };
  const reload = () => {
    window.location.reload();
  };

  return (
    <div>
      <h2>글 작성하기</h2>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={handleTitleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>내용</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="내용을 입력하세요"
            value={content}
            onChange={handleContentChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit}>
          작성 완료
        </Button>
        <Button variant="primary">
          <a href="http://localhost:5175/"> 홈으로 </a>
        </Button>
      </Form>
    </div>
  );
};

export default Write;
