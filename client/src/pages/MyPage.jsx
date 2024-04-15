import React from "react";
import NavigationBar from "../components/NavigationBar";
import { Link, NavLink } from "react-router-dom";

const MyPage = () => {
  const activeStyle = {
    color: "#289951",
    fontWeight: 700,
  };

  return (
    <div>
      <div className="navbar">
        <NavigationBar />
      </div>

      <div className="content" style={{ marginTop: "250px" }}>
        <div>마이페이지</div>
        <ul>
          <li>
            <NavLink
              style={({ isActive }) => (isActive ? activeStyle : {})}
              to="/mypage"
            >
              내 정보
            </NavLink>
          </li>
          {/* <li>
            <div>내가 쓴 글 보기</div>
          </li> */}
        </ul>
      </div>
    </div>
  );
};

export default MyPage;
