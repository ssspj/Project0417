// ResetPassword.jsx

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state ? location.state : {}; // location.state가 null이면 빈 객체를 사용
  console.log("전달된 이메일:", location.state?.email); // 이메일 콘솔로 출력
  const handleResetPassword = async (e) => {
    e.preventDefault(); // 폼의 기본 동작 방지
    if (newPassword !== confirmPassword) {
      setMessage("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/reset-password",
        {
          email,
          newPassword,
        }
      );

      if (response.data.success) {
        setMessage(""); // 메시지 초기화
        alert("비밀번호가 성공적으로 변경되었습니다."); // 변경 완료 알림

        navigate("/"); // 메인 페이지로 이동
      } else {
        setMessage("비밀번호 변경 중 오류가 발생했습니다.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    setPasswordMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatch(e.target.value === newPassword);
  };
  return (
    <div className="login">
      <div className="login_main">
        <h2>새로운 비밀번호 입력</h2>
        <form onSubmit={handleResetPassword}>
          <div className="inputTag">
            <input
              className="input-text"
              type="password"
              value={newPassword}
              placeholder="새로운 비밀번호"
              onChange={handlePasswordChange}
            />
            <label htmlFor="new_password">
              새로운 비밀번호{" "}
              <span style={{ paddingLeft: "5px", color: "red" }}>*</span>
            </label>
          </div>
          <br />
          <div className="inputTag">
            <input
              className="input-text"
              type="password"
              value={confirmPassword}
              placeholder="비밀번호 확인"
              onChange={handleConfirmPasswordChange}
            />
            <label htmlFor="confirm_password">
              비밀번호 확인{" "}
              <span style={{ paddingLeft: "5px", color: "red" }}>*</span>
            </label>
          </div>
          {!passwordMatch && (
            <p style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</p>
          )}
          <br />
          <button id="login_btn" type="submit">
            변경
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
