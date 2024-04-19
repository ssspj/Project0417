const express = require("express");
const cors = require("cors");
const session = require("express-session");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const FileStore = require("session-file-store")(session);

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// session 설정
app.use(
  session({
    name: "session ID",
    secret: "jachwi",
    resave: false,
    saveUninitialized: false,
    store: new FileStore(),
    cookie: {
      maxAge: 24 * 60 * 1000,
      httpOnly: false,
      secure: false,
    },
  })
);

// 모든 요청에 대한 미들웨어
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store"); // 모든 요청에 대해 캐시 비활성화
  next();
});

// API 라우트 설정
app.use("/api", userRoutes);

app.listen(port, () => {
  console.log(`서버 실행 ${port}`);
});
