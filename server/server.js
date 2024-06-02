const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const cors = require('cors'); // CORS 미들웨어 추가
const userRoutes = require('./routes/user');
const app = express();
const port = 5000;

// MongoDB 연결 설정
mongoose.connect('mongodb+srv://admin:1234@cluster0.lybmjvg.mongodb.net/gamedata', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB에 연결 성공');
}).catch((error) => {
  console.error('MongoDB 연결 오류:', error);
});

// CORS 미들웨어 설정
app.use(cors());

// 세션 미들웨어 설정
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 라우트 설정
app.use('/api/users', userRoutes);

// 정적 파일 서빙 설정
app.use('/Build', express.static(path.join(__dirname, 'Build')));
app.use('/TemplateData', express.static(path.join(__dirname, 'TemplateData')));

// WebGL index.html 서빙
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 게임 페이지 서빙
app.get('/game', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/');
  }
  res.sendFile(path.join(__dirname, 'Build/index.html'));
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
