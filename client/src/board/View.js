import { useNavigate, useParams } from "react-router-dom";

const View = ({ list, setList }) => {
  const { id } = useParams();
  const itm = list.find((it) => String(it.id) === id);

  const navigate = useNavigate();

  const onModify = () => {
    navigate(`/modify/${id}`);
  };

  const onDelete = () => {
    //list 에서 id === id 를 제외한 새배열을 만듦
    const r = list.filter((it) => String(it.id) !== id);
    setList(r);
    navigate("/list");
  };

  return (
    <>
      <ul>
        <li>
          <span>제목</span>
          <strong>{itm.subject}</strong>
        </li>
        <li>
          <span>이름</span>
          <strong>{itm.name}</strong>
        </li>
        <li>
          <span>날짜</span>
          <strong>{itm.date}</strong>
        </li>
        <li>
          <span>내용</span>
          <strong style={{ whiteSpace: "pre-line" }}>{itm.content}</strong>
        </li>
      </ul>
      <button onClick={onDelete}>삭제</button>
      <button onClick={onModify}>수정</button>
    </>
  );
};
export default View;
