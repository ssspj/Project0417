import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import modifyPost from "./modifyPost";
import NavigationBar from "../components/NavigationBar";
import "./Modify.css";

const Modify = ({ list }) => {
  const { id } = useParams();
  const itm = list.find((it) => String(it.id) === id) || {
    title: " ",
    author: " ",
    content: " ",
  };

  const [inputs, setInputs] = useState({
    title: itm.title,
    author: itm.author,
    content: itm.content,
  });

  const navigate = useNavigate();

  const onModify = async () => {
    try {
      if (
        inputs.title.trim().length === 0 ||
        inputs.content.trim().length === 0
      ) {
        alert("제목과 내용을 모두 입력해주세요.");
        return;
      }
      // 포스트 수정 요청 보내기
      await modifyPost(id, inputs);
      // 성공적으로 수정되면 리스트 페이지로 이동
      navigate("/list");
    } catch (error) {
      console.error("Error modifying post:", error);
      // 수정 실패 시 에러 처리
      // 이 부분에서 적절한 에러 처리 로직을 추가하세요
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
        <ul>
          <li>
            <label htmlFor="subject">제목</label>
            <input
              type="text"
              name="title"
              value={inputs.title}
              onChange={onChange}
            />
          </li>
          {/* <li>
            <label htmlFor="subject">작성자</label>
            <input name="author" value={inputs.author} onChange={onChange} />
          </li> */}
          <li>
            <label htmlFor="subject">내용</label>
            <textarea
              name="content"
              value={inputs.content}
              onChange={onChange}
            />
          </li>
        </ul>
        <button className="modifyButton" onClick={onModify}>
          수정
        </button>
      </div>
    </>
  );
};

export default Modify;
