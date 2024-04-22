// UserCheck.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserCheck = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/check-user",
        {
          username,
          email,
        }
      );

      if (response.data.exists) {
        // 사용자가 존재하는 경우, 비밀번호 재설정 페이지로 이동
        console.log("전달된 이메일:", email); // 이메일 콘솔로 출력
        navigate("/resetpassword", { state: { email } });
      } else {
        setMessage("해당 사용자가 존재하지 않습니다.");
      }
    } catch (error) {
      console.error("Error checking user:", error);
      setMessage("사용자 확인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="login">
      <div className="login_main">
        <h2>비밀번호 찾기</h2>
        <form className="login_form:" onSubmit={handleSubmit}>
          <div className="inputTag">
            <input
              className="input-text"
              type="text"
              value={username}
              placeholder="아이디를 입력해주세요"
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="input_id">
              아이디 <span style={{ paddingLeft: "5px", color: "red" }}>*</span>
            </label>
          </div>

          <br />
          <div className="inputTag">
            <input
              className="input-text"
              type="email"
              id="input.emai_"
              value={email}
              placeholder="이메일을 입력해주세요"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="input_email">
              이메일 <span style={{ paddingLeft: "5px", color: "red" }}>*</span>
            </label>
          </div>
          <br />
          <button id="login_btn" type="submit">
            확인
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default UserCheck;
