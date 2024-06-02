const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

// 회원가입 라우트
router.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: '아이디와 비밀번호를 입력하세요.' });
  }

  try {
    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새로운 사용자 생성
    const newUser = new User({ username, password: hashedPassword });

    // 사용자 저장
    await newUser.save();

    res.status(201).json({ message: '회원가입 성공' });
  } catch (error) {
    console.error('회원가입 오류:', error);
    if (error.code === 11000 && error.keyValue.username) {
      // 중복된 아이디 오류 처리
      return res.status(400).json({ message: '이미 등록된 아이디입니다.' });
    }
    res.status(500).json({ message: '서버 오류' });
  }
});

// 로그인 라우트
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: '아이디와 비밀번호를 입력하세요.' });
  }

  try {
    // 사용자 찾기
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ success: false, message: '아이디 또는 비밀번호가 잘못되었습니다.' });
    }

    // 비밀번호 비교
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: '아이디 또는 비밀번호가 잘못되었습니다.' });
    }

    // 로그인 성공 시 세션 설정 (또는 JWT 토큰 발급)
    req.session.user = user; // 세션 사용 예시
    res.status(200).json({ success: true, message: '로그인 성공' });
  } catch (error) {
    res.status(500).json({ success: false, message: '서버 오류' });
  }
});

module.exports = router;
