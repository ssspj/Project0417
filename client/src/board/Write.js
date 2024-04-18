import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Write.css";
import NavigationBar from "../components/NavigationBar";

const Write = ({ list, setList, idRef }) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    // 서버에서 세션 정보를 가져와서 username을 설정합니다.
    const fetchSession = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/session", {
          credentials: "include",
        });
        const data = await response.json();
        if (data.user) {
          setUsername(data.user.username);
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };

    fetchSession();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const time = new Date(); // 현재 시간 생성
      const created_at = time.toISOString(); // 작성일을 ISO 포맷으로 변환하여 추가
      const response = await fetch("http://localhost:5000/api/write12", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, author: username, content, created_at }),
      });

      if (!response.ok) {
        throw new Error("Failed to save data");
      }

      const data = await response.json();
      console.log(data.message); // 서버로부터 받은 응답 메시지 출력

      // 저장에 성공했을 때만 리스트에 추가
      setList([...list, { title, author: username, content, created_at }]);

      idRef.current = idRef.current + 1;

      navigate("/list");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="navbar">
        <NavigationBar />
      </div>
      <div className="write-container">
        <h2>게시글 작성</h2>
        <form onSubmit={onSubmit}>
          <ul>
            <li>
              <label htmlFor="subject">제목</label>
              <input
                type="text"
                id="subject"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </li>
            <li>
              <label htmlFor="content">내용</label>
              <textarea
                type="text"
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </li>
          </ul>
          <button className="writeButton">작성</button>
        </form>
      </div>
    </>
  );
};

export default Write;
