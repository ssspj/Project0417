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
  const [comments,setComments] = useState([]);
  const [newComment, setNewComment] = useState(""); // 새로운 댓글 상태 추가
  const [recommentBoxVisibility, setRecommentBoxVisibility] = useState({}); // 대댓글 입력 상자의 가시성 상태 추가
  const [newRecomment, setNewRecomment] = useState(""); // 새로운 대댓글 상태 추가
  const [, setRecomments] = useState([]); // 대댓글 상태 추가

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

       axios
      .get(`http://localhost:5000/api/commentGet/${id}`)
      .then((response) => {
        setComments(response.data.comments);

        // 댓글에 대한 대댓글 가져오기
        response.data.comments.forEach((comment) => {
          axios
            .get(`http://localhost:5000/api/recommentGet/${comment.id}`)
            .then((recommentResponse) => {
              setRecomments((prevRecomments) => ({
                ...prevRecomments,
                [comment.id]: recommentResponse.data.recomments,
              }));
            })
            .catch((error) => {
              console.error("Error fetching recomments:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });

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

  const submitComment = async () => {
    try {
      await axios.post("http://localhost:5000/api/commentPost", {
        post_id: id,
        author: currentUser.username,
        content: newComment,
      });
      
      setNewComment(""); // 댓글 작성 후 입력창 초기화
      alert("댓글이 작성되었습니다.");

      window.location.reload();

    } catch (error) {
      console.error("Error posting comment:", error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  const toggleRecommentBox = (commentId) => {
    setRecommentBoxVisibility((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  const submitRecomment = async (parentId) => {
    try {
      await axios.post("http://localhost:5000/api/recommentPost", {
        post_id: id,
        parent_comment_id: parentId,
        author: currentUser.username,
        content: newRecomment,
      });
      
      setNewComment(""); // 댓글 작성 후 입력창 초기화
      alert("대댓글이 작성되었습니다.");
  
      window.location.reload();
  
    } catch (error) {
      console.error("Error posting recomment:", error);
      alert("대댓글 작성에 실패했습니다.");
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
              {comments.map((comment, index) => (
                <div key={comment.id} className="comment-container" style={{ marginBottom: index === comments.length - 1 ? 0 : `${comment.content.split('\n').length * 20}px` }}>
                  <div className="comment">
                    <p>작성자: {comment.author}</p>
                    <p>{comment.content}</p>
                  </div>
                  {index !== comments.length - 1 && <hr className="comment-divider" />}
                  {/* 대댓글 작성 버튼 */}
                  <button className="recomment-toggle-button" onClick={() => setRecommentBoxVisibility({ ...recommentBoxVisibility, [comment.id]: !recommentBoxVisibility[comment.id] })}>
                    {recommentBoxVisibility[comment.id] ? "대댓글 숨기기" : "대댓글 작성하기"}
                  </button>
                  {/* 대댓글 목록 */}
                  {comment.recomments && recommentBoxVisibility[comment.id] && (
                    <div className="recomments-container">
                      {comment.recomments.map((recomment) => (
                        <div key={recomment.id} className="recomment-container">
                          <p>작성자: {recomment.author}</p>
                          <p>{recomment.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* 대댓글 입력 상자 */}
                  {recommentBoxVisibility[comment.id] && (
                    <div className="recomment-form">
                      <textarea 
                        placeholder="대댓글을 입력하세요"
                        value={newRecomment}
                        onChange={(e) => setNewRecomment(e.target.value)}
                      ></textarea>
                      <button className="recomment-button" onClick={() => submitRecomment(comment.id)}>
                        대댓글 작성
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="comment-form">
              <textarea 
                placeholder="댓글을 입력하세요"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button className="comment-button" onClick={submitComment}>
                작성
              </button>
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
