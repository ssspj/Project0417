import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../../../components/NavigationBar";
import { GiHamburgerMenu } from "react-icons/gi";
import "./View.css";

const View = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  //const [comments, setComments] = useState([]);

  useEffect(() => {
    // 현재 로그인한 사용자 정보를 가져오는 요청
    axios
      .get("http://localhost:5000/api/session", { withCredentials: true })
      .then((response) => {
        setCurrentUser(response.data.user);
      })
      .catch((error) => {
        console.error("Error fetching user session:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/view/${id}`)
      .then((response) => {
        const postWithFormattedDate = {
          ...response.data.post,
          formattedDate: new Date(response.data.post.created_at)
            .toLocaleDateString("ko-KR")
            .replace(/\.$/, ""), //마지막에 위치한 점 제거
        };
        setPost(postWithFormattedDate);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
      });

    // axios
    //   .get(`http://localhost:5000/api/comments/${id}`)
    //   .then((response) => {
    //     setComments(response.data.comments);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching comments:", error);
    //   });
  }, [id]);

  const onEdit = () => {
    navigate(`/modify/${id}`);
  };

  const onDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/${id}`);
      navigate("/list");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      <div className="navbar">
        <NavigationBar />
      </div>
      <div className="view-container">
        {post ? (
          <div className="view">
            <h2 style={{ position: "relative" }}>
              {post.title}
              {currentUser &&
                currentUser.username === post.author && ( // 작성자와 현재 로그인한 사용자가 동일한 경우에만 수정, 삭제 버튼 표시
                  <div className="options-menu">
                    <GiHamburgerMenu
                      onClick={() => setShowOptions(!showOptions)}
                    />
                    {showOptions && (
                      <div className="options-popup">
                        <div className="edit-delete-buttons">
                          <button className="edit-button" onClick={onEdit}>
                            수정
                          </button>
                          <button className="delete-button" onClick={onDelete}>
                            삭제
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
            </h2>

            <p className="author">작성자: {post.author}</p>
            <p className="date">작성일: {post.formattedDate}</p>
            <p className="content">{post.content}</p>
            <div className="comments-container">
              <h3>댓글</h3>
              {/* {comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <p>{comment.text}</p>
                  <p>작성자: {comment.author}</p>
                </div>
              ))} */}
            </div>
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
