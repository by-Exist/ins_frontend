import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Root from './pages';
import "antd/dist/antd.css";
import { BrowserRouter as Router } from "react-router-dom";


ReactDOM.render(
  // StricMode는 개발 모드에서만 활성화된다.
  // 앱 내의 잠재적인 문제를 알아내기 위한 도구.
  <React.StrictMode>
    {/* 이렇게 감싸야 Router 기능을 활용할 수 있다. */}
    <Router>
      <Root />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
