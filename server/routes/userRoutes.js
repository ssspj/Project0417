const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const boardController = require("../controllers/boardController");

// 회원가입 엔드포인트
router.post("/signup", userController.signup);

// 로그인 엔드포인트
router.post("/login", userController.login);

// 중복 확인 라우트
router.post("/checkUsername", userController.checkUsername);

// 로그아웃 라우트
router.post("/logout", userController.logout);

// 로그인 성공 여부 라우트
router.get("/login/success", userController.loginsuccess);

//비밀번호 찾기를 위한 사용자 확인
router.post("/check-user", userController.checkUser);

// 새 비밀번호 입력
router.post("/reset-password", userController.resetPassword);

// 세션 로그인 구현
router.get("/session", userController.session);

// 게시글 데베 저장
router.post("/write12", boardController.post);

// 저장된 데베글 가져오기
router.get("/view/:id", boardController.getPostById);

// 게시글 수정
router.put("/modify/:id", boardController.ModifyPost);

// 게시글 삭제
router.delete("/delete/:id", boardController.deletePostById);

// 게시글 가져오기
router.get("/getPost", boardController.getPosts);

// 최신 게시글 가져오기
router.get("/getLatestPosts", boardController.getLatestPosts);

module.exports = router;
