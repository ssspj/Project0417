import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../../../components/NavigationBar";
import { GiHamburgerMenu } from "react-icons/gi";
import "./View.css";

const View = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  //const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/view/${id}`)
      .then((response) => {
        setPost(response.data.post);
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
            <div className="options-menu">
              <GiHamburgerMenu onClick={() => setShowOptions(!showOptions)} />
              {showOptions && (
                <div className="options-popup">
                  <Link to={`/modify/${id}`}>수정</Link>
                  <button onClick={onDelete}>삭제</button>
                </div>
              )}
            </div>
            <h2>{post.title}</h2>
            <p className="author">작성자: {post.author}</p>
            <p className="date">작성일: {post.created_at}</p>
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
