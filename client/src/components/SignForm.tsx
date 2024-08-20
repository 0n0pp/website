import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css'; // CSS 파일 임포트

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', { username, password });
      if (response.status === 201) {
        navigate('/login'); // 회원가입 후 로그인 페이지로 이동
      }
    } catch (err) {
      setError('회원가입에 실패했습니다.');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="signupForm">
        <h1 className="signup_title">회원가입</h1>
        <div className="signup_input">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디"
            className="userId"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="password"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="signup_button">회원가입</button>
        <div className="link">
          <a href="/login">로그인</a>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
