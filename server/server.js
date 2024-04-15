const express = require("express");
const cors = require("cors");
const session = require('express-session');
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const FileStore = require('session-file-store')(session);

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors({
  origin: "http://localhost:3000", // 출처 허용 옵션
  credentials: true // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
}));
app.use(express.json());

// session 설정
app.use(session({
  name : "session ID",
  secret: 'jachwi',  // 세션 암호화
  resave: false,
  saveUninitialized: true,
  store : new FileStore() ,
  cookie : {
    maxAge : 24 * 60 * 1000,  // if 안하게 되면쿠키의 유효기간이 무한대로 지정됨 (즉, 설정해야한다는 뜻)
    httpOnly :  false,  // https를 사용하려면 true로 설정해줘야함
    secure : false  // https와 http 프로토콜을 나누는 옵션
  }
}))

// 모든 요청에 대한 미들웨어 (view 속성을 사용하여 세션 정보를 관리하고 갱신)
app.use("/", (req, res, next )=> {
  try {
    if(req.session.views) {
      req.session.views++;
  } else {
    req.session.views=1;
  }
    console.log('session info', req.session);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
}); 

// API 라우트 설정
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`서버 실행 ${port}`);
});
