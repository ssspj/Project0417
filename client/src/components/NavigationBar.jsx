import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/NavigationBar.css";

const NavigationBar = () => {
  const [isFirstRender, setIsFirstRender] = useState(true); // 첫 번째 렌더링 여부를 useState로 관리 
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(null);

  const handleLogoClick = () => {
    setActiveMenu(null);
    navigate("/main");
  };

  const handleMyPageClick = () => {
    navigate("/mypage");
  };

  const handleBoardClick = () => {
    setActiveMenu("board");
    navigate("/list");
  };
  const handleChatClick = () => {
    setActiveMenu("chat");
    navigate("/join");
  };

  const handleLogout = async () => {
    try {
      // 서버로 로그아웃 요청을 보냅니다.
      await axios.post("http://localhost:5000/api/logout", {}, { withCredentials: true });
      // 로그아웃 성공 시 로그인 페이지로 이동합니다.
      navigate("/");
    } catch (error) {
      console.error("로그아웃에 실패하였습니다:", error);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/session", { withCredentials: true });
        if (response.data.user) {
          setIsLogin(true);
          setUser({
            username: response.data.user.username,
            email: response.data.user.email,
          });
        }
      } catch (error) {
        console.error("세션 정보를 가져오는데 실패하였습니다:", error);
      } finally {
        // 세션 정보를 가져온 후에 isFirstRender 상태를 업데이트합니다.
        setIsFirstRender(false);
      }
    };
  
    checkLoginStatus();
  }, []);

  return (
    <div className="navbar">
      <nav>
        <div className="logo" onClick={handleLogoClick}>
          자취 어때
        </div>
        <div className="spacer"></div>
        <div
          className="navbarmenu"
          // onClick={handleDeliveryClick}
          style={{
            color:
              activeMenu === "delivery" || location.pathname === "/delivery"
                ? "black"
                : "gray",
          }}
        >
          공동 배달
        </div>
        <div
          className="navbarmenu"
          onClick={handleBoardClick}
          style={{
            color:
              activeMenu === "board" || location.pathname === "/list"
                ? "black"
                : "gray",
          }}
        >
          게시판
        </div>
        <div
          className="navbarmenu"
          onClick={handleChatClick}
          style={{
            color:
              activeMenu === "chat" || location.pathname === "/join"
                ? "black"
                : "gray",
          }}
        >
          채팅
        </div>

        <div className="spacer"></div>
        <div className="mypage" onClick={handleMyPageClick}>
          마이페이지
        </div>
        <div className="navbar-divider"></div>
        {user ? (
        <div className="logout" onClick={handleLogout}>
          로그아웃
        </div>
      ) : (
        <div>
          <p>로그인이 필요합니다.</p>
          <Link to="/">로그인 페이지로 이동</Link>
        </div>
      )}
      </nav>
    </div>
  );
};

export default NavigationBar;
