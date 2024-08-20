import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css'; // CSS 파일 임포트

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/users/login', 
        { username, password },
        { withCredentials: true } // 쿠키를 포함시켜 세션을 유지
      );
      if (response.status === 200) {
        navigate('/game'); // 로그인 후 게임 페이지로 이동
      }
    } catch (err) {
      setError('아이디 또는 비밀번호가 잘못되었습니다.');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="loginForm">
        <h1 className="login_title">로그인</h1>
        <div className="input">
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
        <button type="submit" className="loginBut">로그인</button>
        <Link to="/signup" className="signupBut">회원가입</Link>
      </form>
    </div>
  );
};

export default LoginForm;
