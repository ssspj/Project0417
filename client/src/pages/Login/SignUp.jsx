import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";

function Signup() {
  // 회원가입 폼의 상태를 관리하기 위한 useState 훅을 사용합니다.
  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState(true); // username 중복 여부 상태
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true); // 비밀번호 일치 여부 상태
  const [passwordError, setPasswordError] = useState("");

  // 회원가입 폼을 제출할 때 실행되는 함수입니다.
  const handleSubmit = async (e) => {
    e.preventDefault();
    // 입력값 유효성 검사
    if (!email || !password || !confirmPassword || !username) {
      // 빈 입력칸이 있는 경우 알람창을 띄움
      alert("모든 항목을 입력하세요.");
      return;
    }
    if (!passwordMatch) {
      // 비밀번호가 일치하지 않을 경우 회원가입 시도하지 않음
      return;
    }
    try {
      // 사용자의 입력값을 서버로 전송하여 회원가입을 시도합니다.
      const response = await axios.post("http://localhost:5000/api/signup", {
        username,
        password,
        email,
      });
      console.log(response.data); // 서버로부터 받은 응답을 콘솔에 출력합니다.
      // 회원가입이 성공하면 다음 작업을 수행할 수 있습니다.
      //localStorage.setItem("username", username);
      alert("회원가입에 성공했습니다");
    } catch (error) {
      // 회원가입에 실패하면 에러 메시지를 설정합니다.
      console.log("Failed to sign up:.", error);
    }
  };

  // 비밀번호 확인 입력란 값이 변경될 때마다 비밀번호 일치 여부를 확인하는 함수
  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue); // 비밀번호 확인 상태 업데이트

    // 비밀번호와 비밀번호 확인 값이 일치하는지 확인
    if (confirmPasswordValue === password) {
      setPasswordMatch(true); // 비밀번호 일치
    } else {
      setPasswordMatch(false); // 비밀번호 불일치
    }
  };

  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{5,}$/;
    if (passwordValue === "") {
      setPasswordError("");
    } else if (!passwordRegex.test(passwordValue)) {
      setPasswordError(
        "비밀번호는 5자 이상이어야 하며 영문, 숫자, 특수문자를 포함해야 합니다."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleUsernameChange = (event) => {
    const { value } = event.target;
    setUsername(value);

    // 서버에 중복 확인 요청
    if (value.trim() === "") {
      setUsernameAvailable(true);
      return;
    }
    // 입력값이 공백이 아닌 경우에만 요청
    axios
      .post("http://localhost:5000/api/checkUsername", { username: value })
      .then((response) => {
        setUsernameAvailable(response.data.available);
      })
      .catch((error) => {
        console.error("Error checking username:", error);
      });
  };

  return (
    <div className="signup">
      <div className="login_main">
        <h2>회원가입</h2>
        <form className="login_form" onSubmit={handleSubmit}>
          <div className="inputTag">
            <input
              className="input-text"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="input_id">
              이메일 <span style={{ color: "#EF4565" }}>*</span>
            </label>
          </div>

          <div style={{ marginTop: "26px" }} />

          <div className="inputTag">
            <input
              className="input-text"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <label htmlFor="input_pw">
              비밀번호 <span style={{ color: "#EF4565" }}>*</span>
            </label>
          </div>
          {passwordError && (
            <div className="errorMSG">
              <small style={{ color: "red" }}>{passwordError}</small>
            </div>
          )}
          <div style={{ marginTop: "26px" }} />

          <div className="inputTag">
            <input
              className="input-text"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <label htmlFor="input_pw">
              비밀번호 확인 <span style={{ color: "#EF4565" }}>*</span>
            </label>
          </div>
          <div className="errorMSG">
            {!passwordMatch && <div>비밀번호가 일치하지 않습니다</div>}
          </div>

          <div style={{ marginTop: "26px" }} />

          <div className="inputTag" onSubmit={handleSubmit}>
            <input
              className="input-text"
              type="text"
              value={username}
              onChange={handleUsernameChange}
            />
            <label htmlFor="input_name">
              아이디 <span style={{ color: "#EF4565" }}>*</span>
            </label>
          </div>
          <div>
            {username.trim() !== "" && (
              <span style={{ color: usernameAvailable ? "green" : "red" }}>
                {usernameAvailable
                  ? "사용가능한 아이디입니다"
                  : "중복된 아이디입니다"}
              </span>
            )}
          </div>

          <div style={{ marginTop: "26px" }} />

          <button id="login_btn" type="submit">
            회원가입
          </button>
          <p className="link_box" style={{ textAlign: "center" }}>
            계정이 있으신가요? <Link to="/">로그인</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
