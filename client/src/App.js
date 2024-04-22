import "./App.css";
import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Login/SignUp";
import UserCheck from "./pages/Login/UserCheck";
import ResetPassword from "./pages/Login/ResetPassword";
import Main from "./pages/Main/Main";
import List from "./pages/board/List/List";
import Modify from "./pages/board/Modify/Modify";
import View from "./pages/board/View/View";
import Write from "./pages/board/Write/Write";
import Join from "./pages/Chat/Join/Join";
import MyPage from "./pages/MyPage/MyPage";

function App() {
  const [list, setList] = useState([]);
  const idRef = useRef(1);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/usercheck" element={<UserCheck />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/main" element={<Main />} />
        <Route path="/list" element={<List list={list} />} />
        <Route
          path="/view/:id"
          element={<View list={list} setList={setList} />}
        />
        <Route
          path="/modify/:id"
          element={<Modify list={list} setList={setList} />}
        />
        <Route
          path="/write"
          element={<Write list={list} setList={setList} idRef={idRef} />}
        />
        <Route path="/join" element={<Join />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
