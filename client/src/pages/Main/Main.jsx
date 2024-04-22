import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../../components/NavigationBar";
import "./Main.css";

const Main = () => {
  const [latestPosts, setLatestPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // 최신 게시글 5개를 가져오는 요청
    axios
      .get("http://localhost:5000/api/getLatestPosts")
      .then((response) => {
        setLatestPosts(response.data.latestPosts); // 수정: latestPosts로 받아옴
      })
      .catch((error) => {
        console.error("Error fetching latest posts:", error);
      });
  }, []);

  const handleTitleClick = (postId) => {
    navigate(`/view/${postId}`);
  };

  return (
    <div className="main">
      <NavigationBar />

      <div className="mainlist-container">
        <h2>최신 게시글</h2>
        <table className="mainTable">
          <thead>
            <tr>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {latestPosts.map((post) => (
              <tr key={post.id}>
                <td>
                  <span
                    className="title"
                    onClick={() => handleTitleClick(post.id)}
                  >
                    {post.title}
                  </span>
                </td>
                <td>{post.author}</td>
                <td>{post.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="latest-posts"></div>
      </div>
    </div>
  );
};

export default Main;
