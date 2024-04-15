import "./App.css";
import React, { useRef, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Main from "./pages/Main";
import List from "./board/List";
import Modify from "./board/Modify";
import View from "./board/View";
import Write from "./board/Write";
import MyPage from "./pages/MyPage";

function App({ chatService, baseURL }) {
  const [username, setUsername] = useState();
  const [list, setList] = useState([]);
  const idRef = useRef(1);

  return (
    <Router>
      <Routes>
        <Route exact path="/join" element={<Join />}>
          {/* {!username ? (
            <Join chatService={chatService} setUsername={setUsername} />
          ) : (
            <Navigate to="/chat" />
          )} */}
        </Route>
        <Route path="/signup" element={<SignUp />} />
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
        <Route path="/chat">
          {/* {username ? (
            <Chat
              chatService={chatService}
              username={username}
              baseURL={baseURL}
            />
          ) : (
            <Navigate to="/" />
          )} */}
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
