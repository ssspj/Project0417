import React from "react";
import { Link, useNavigate } from "react-router-dom";
import NavigationBar from "../components/NavigationBar";
import "./List.css"; // CSS 파일을 import 합니다.

const List = ({ list }) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="navbar">
        <NavigationBar />
      </div>

      <div className="table-container">
        {" "}
        {/* .table-container 클래스를 추가합니다. */}
        <table className="table">
          {" "}
          {/* .table 클래스를 추가합니다. */}
          <thead>
            <tr>
              <th>글 번호</th> {/* <th>로 변경합니다. */}
              <th>제목</th> {/* <th>로 변경합니다. */}
              <th>작성자</th> {/* <th>로 변경합니다. */}
              <th>날짜</th> {/* <th>로 변경합니다. */}
            </tr>
          </thead>
        </table>
        <hr className="hr-long" />
        <table className="table">
          <tbody>
            {list.map((it, idx) => {
              return (
                <tr key={it.id}>
                  <td>{idx + 1}</td> {/* <td>로 변경합니다. */}
                  <td>
                    <Link to={`/view/${it.id}`}>{it.subject}</Link>
                  </td>{" "}
                  {/* <td>로 변경합니다. */}
                  <td>{it.name}</td> {/* <td>로 변경합니다. */}
                  <td>{it.date}</td> {/* <td>로 변경합니다. */}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="button-container">
          {" "}
          {/* .button-container 클래스를 추가합니다. */}
          <button className="button" onClick={() => navigate("/write")}>
            글작성
          </button>{" "}
          {/* .button 클래스를 추가합니다. */}
        </div>
      </div>
    </>
  );
};

export default List;
