const db = require("../database/db.js"); // db.js 파일의 경로에 맞게 수정
const bcrypt = require("bcrypt");

// 회원가입 로직
exports.signup = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // 비밀번호 해싱
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO usertable (username, password, email) VALUES (?, ?, ?)`;
    db.query(sql, [username, hashedPassword, email], (err, result) => {
      if (err) {
        console.error("회원가입에 실패했습니다:", err);
        res
          .status(500)
          .json({ success: false, message: "회원가입에 실패했습니다" });
        return;
      }
      console.log("회원가입에 성공했습니다.");
      res.json({ success: true, message: "회원가입에 성공했습니다" });
    });
  } catch (error) {
    console.error("비밀번호 해싱에 실패했습니다.", error);
    res
      .status(500)
      .json({ success: false, message: "비밀번호 해싱에 실패했습니다. " });
  }
};

// 로그인 로직
exports.login = (req, res) => {
  const { email, password } = req.body;
  const sql = `SELECT * FROM usertable WHERE email = ?`;
  db.query(sql, [email], async (err, result) => {
    if (err) {
      console.error("오류가 발생했습니다:", err);
      res
        .status(500)
        .json({ success: false, message: "로그인에 오류가 발생했습니다" });
      return;
    }
      if (result.length > 0) {
        const user = result[0];
        console.log("사용자 정보:", user);
        try {
          // 저장된 해시된 비밀번호와 클라이언트에서 전송한 비밀번호를 bcrypt를 사용하여 비교합니다.
          if (await bcrypt.compare(password, user.password)) { // 클라이언트에서 보낸 비밀번호를 해싱하여 비교합니다.
            console.log("로그인에 성공했습니다.");
            req.session.user = {
              email: user.email,
              username: user.username
            };
          req.session.save(() => {
            console.log("세션 저장 완료");
            res.status(200).json({ success: true, message: "로그인에 성공했습니다!", user });
          });
        } else {
          console.log("올바른 이메일과 비밀번호를 입력해주세요.");
          res.status(401).json({
            success: false,
            message: "올바른 이메일과 비밀번호를 입력해주세요!",
          });
        }
      } catch (error) {
        console.error("비밀번호 비교 중 에러 발생:", error);
        res.status(500).json({
          success: false,
          message: "로그인에 오류가 발생했습니다",
        });
      }
    } else {
      console.log("존재하지 않는 사용자입니다.");
      res.status(401).json({
        success: false,
        message: "올바른 이메일과 비밀번호를 입력해주세요!",
      });
    }
  });
};


// 중복 확인 로직
exports.checkUsername = (req, res) => {
  const { username } = req.body;
  const sql = `SELECT * FROM usertable WHERE username = ?`;
  db.query(sql, [username], (err, result) => {
    if (err) {
      console.error("중복 오류입니다.:", err);
      res.status(500).json({ success: false, message: "중복 오류입니다." });
      return;
    }
    if (result.length > 0) {
      // 중복된 username이 존재함을 클라이언트에게 알립니다.
      res.json({ available: false });
    } else {
      // 사용 가능한 username임을 클라이언트에게 알립니다.
      res.json({ available: true });
    }
  });
};

// 로그아웃 로직
exports.logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error("세션 삭제에 실패하였습니다:", err);
        res.status(500).json({ success: false, message: "세션 삭제에 실패하였습니다" });
        return;
      }
      res.status(200).json({ success: true, message: "로그아웃에 성공하였습니다" });
    });
  } catch (error) {
    console.error("로그아웃에 실패하였습니다:", error);
    res.status(500).json({ success: false, message: "로그아웃에 실패하였습니다" });
  }
};

//  클라이언트에서 서버에 로그인 성공여부 확인을 위한 로직
  exports.loginsuccess = (req, res) => {
    try {
      const data = req.session;
      res.status(200).json(data);
    } catch (error) {
      res.status(403).json("유저를 찾을 수 없습니다.");
    }
  }

  // 세션 정보 반환
  exports.session = (req, res) => { 
    if (req.session.user) {
      res.status(200).json({ user: req.session.user });
    } else {
      res.status(403).json("세션에 유저 정보가 없습니다.");
    }
  };

  exports.post=(req, res) => {

  
    const { title, author, content } = req.body;
  
    if (!title || !author || !content) {
      return res.status(400).json({ success: false, message: '제목, 작성자, 내용을 모두 제공해야 합니다.' });
    }
  
    // 데이터베이스에 텍스트 정보 저장
    const sql = 'INSERT INTO posts (title, author, content) VALUES (?, ?, ?)';
    db.query(sql, [title, author, content], (err, result) => {
      if (err) {
        console.error('Error inserting text into database:', err);
        res.status(500).json({ success: false, message: '텍스트를 데이터베이스에 저장하는 중 오류가 발생했습니다.' });
        return;
      }
     
      console.log('텍스트를 데이터베이스에 성공적으로 저장했습니다.');
      res.status(201).json({ success: true, message: '텍스트가 데이터베이스에 성공적으로 저장되었습니다.' });
    });
    
  };

  exports.getPostById = (req, res) => {

    const { id } = req.params; // URL에서 파라미터로 전달된 아이디 값
  
    // 데이터베이스에서 특정 아이디의 포스트를 가져오는 쿼리
    const sql = "SELECT * FROM posts WHERE id = ?";
  
    // 쿼리 실행
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error fetching post by id:", err);
        res.status(500).json({ success: false, message: "아이디로 포스트를 가져오는 중 오류가 발생했습니다." });
        return;
      }
  
      // 해당 아이디에 해당하는 포스트가 없을 경우
      if (result.length === 0) {
        res.status(404).json({ success: false, message: "해당 아이디에 해당하는 포스트를 찾을 수 없습니다." });
        return;
      }
  
      // 성공적으로 포스트를 가져왔을 때 클라이언트로 응답 전송
      res.status(200).json({ success: true, post: result[0] });
    });
  
  };

  