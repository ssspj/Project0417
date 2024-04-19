import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import NavigationBar from "../../../components/NavigationBar";
import "./Modify.css";

const Modify = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null); // 수정 필요: 이전에 입력한 제목과 내용을 저장할 상태 추가
  const [inputs, setInputs] = useState({
    title: "", // 수정 필요: 초기값을 빈 문자열로 설정
    content: "", // 수정 필요: 초기값을 빈 문자열로 설정
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/view/${id}`
        );
        const postData = response.data.post;
        setPost(postData); // 이전에 입력한 제목과 내용을 상태에 저장
        // 이전에 입력한 제목과 내용이 해당 입력칸에 입력되도록 설정
        setInputs({
          title: postData.title,
          content: postData.content,
        });
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [id]);

  const onModify = async () => {
    try {
      if (
        inputs.title.trim().length === 0 ||
        inputs.content.trim().length === 0
      ) {
        alert("제목과 내용을 모두 입력해주세요.");
        return;
      }

      const response = await axios.put(
        `http://localhost:5000/api/modify/${id}`,
        inputs
      );

      if (!response.data.success) {
        throw new Error("Failed to modify post");
      }

      navigate(`/view/${id}`);
    } catch (error) {
      console.error("Error modifying post:", error);
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  return (
    <>
      <div className="navbar">
        <NavigationBar />
      </div>
      <div className="modify-container">
        <h2>게시글 수정</h2>
        {post ? (
          <form>
            <ul>
              <li>
                <label htmlFor="title">제목</label>
                <input
                  className="input-text"
                  type="text"
                  name="title"
                  value={inputs.title} // 수정 필요: 이전에 입력한 제목으로 설정
                  onChange={onChange}
                />
              </li>
              <li>
                <label htmlFor="content">내용</label>
                <textarea
                  className="input-text"
                  name="content"
                  value={inputs.content} // 수정 필요: 이전에 입력한 내용으로 설정
                  onChange={onChange}
                />
              </li>
            </ul>
            <button className="modifyButton" onClick={onModify}>
              수정
            </button>
          </form>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default Modify;
