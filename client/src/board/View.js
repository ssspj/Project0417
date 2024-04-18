import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../components/NavigationBar";
import { GiHamburgerMenu } from "react-icons/gi";
import "./View.css";

const View = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [comments, setComments] = useState([]); // 댓글 상태 추가

  useEffect(() => {
    // axios를 사용하여 서버에서 포스트 데이터 가져오기
    axios
      .get(`http://localhost:5000/api/view/${id}`)
      .then((response) => {
        setPost(response.data.post);
        const serverDate = response.data.post.created_at;
        // 서버로부터 받은 날짜 데이터를 JavaScript Date 객체로 변환
        const date = new Date(serverDate);
        // 날짜를 형식화하여 시간을 생략한 형태로 표시
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
        setFormattedDate(formattedDate);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });

    // 포스트의 댓글 가져오기
    axios
      .get(`http://localhost:5000/api/comments/${id}`)
      .then((response) => {
        setComments(response.data.comments);
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [id]);

  const onDelete = async () => {
    try {
      // 서버에 DELETE 요청 보내기
      await axios.delete(`http://localhost:5000/api/delete/${id}`);
      // 삭제 성공시 리스트 페이지로 이동
      navigate("/list");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const onModify = () => {
    navigate(`/modify/${id}`);
  };

  return (
    <>
      <div className="navbar">
        <NavigationBar />
      </div>
      <div className="view-container">
        {post ? (
          <div className="view">
            <div className="options-menu">
              <GiHamburgerMenu onClick={() => setShowOptions(!showOptions)} />
              {showOptions && (
                <div className="options-popup">
                  <button onClick={onModify}>수정</button>
                  <button onClick={onDelete}>삭제</button>
                </div>
              )}
            </div>
            <h2>{post.title}</h2>
            <p className="author">작성자: {post.author}</p>
            <p className="date">작성일: {formattedDate}</p>
            <p className="content">{post.content}</p>
            {/* 댓글 목록 표시 */}
            <div className="comments-container">
              <h3>댓글</h3>
              {comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <p>{comment.text}</p>
                  <p>작성자: {comment.author}</p>
                </div>
              ))}
            </div>
            {/* 댓글 작성 폼 */}
            <div className="comment-form">
              <textarea placeholder="댓글을 입력하세요"></textarea>
              <button className="comment-button">작성</button>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default View;
