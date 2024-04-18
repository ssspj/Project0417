import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import "./List.css";
import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";

const List = () => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); // 페이지당 표시할 게시글 수

  useEffect(() => {
    // 서버에서 게시글 목록 가져오는 요청
    axios
      .get("http://localhost:5000/api/getPost")
      .then((response) => {
        setList(response.data.posts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  // 현재 페이지의 게시글 범위 계산
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = list.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 변경 이벤트 핸들러
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 페이지 수 배열 생성
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(list.length / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleTitleClick = (postId) => {
    navigate(`/view/${postId}`);
  };

  return (
    <>
      <div className="navbar">
        <NavigationBar />
      </div>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>글번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <React.Fragment key={item.id}>
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    <span
                      className="title"
                      onClick={() => handleTitleClick(item.id)}
                    >
                      {item.title}
                    </span>
                  </td>
                  <td>{item.author}</td>
                  <td>{item.date}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {/* 페이지네이션 버튼 */}
        <div className="pagination">
          <button
            className="back"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <IoIosArrowBack />
          </button>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? "active" : ""}
            >
              {number}
            </button>
          ))}
          <button
            className="forward"
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastPost >= list.length}
          >
            <IoIosArrowForward />
          </button>
        </div>
        <div className="button-container">
          <button className="button" onClick={() => navigate("/write")}>
            글작성
          </button>
        </div>
      </div>
    </>
  );
};

export default List;
