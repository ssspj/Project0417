const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

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

// 세션 로그인 구현
router.get("/session", userController.session);

//게시글 데베 저장
router.post("/write12", userController.post);

//저장된 데베글 가져오기
router.get("/view/:id", userController.getPostById);

module.exports = router;
