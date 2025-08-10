// src/App.js

import React from "react";
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/auth/LoginPage";     
import SignupPage from "./pages/auth/SignupPage"; 
import FindIdPage from "./pages/auth/FindIdPage";
import FindPasswordPage from "./pages/auth/FindPasswordPage";
import QnAList from "./pages/board/QnAList";
import QnAWrite from "./pages/board/QnAWrite";
import QnADetail from "./pages/board/QnADetail";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
         <Route path="/find-id" element={<FindIdPage />} />
        <Route path="/find-password" element={<FindPasswordPage />} />
         <Route path="/qa" element={<QnAList />} />
        <Route path="/qa/write" element={<QnAWrite />} />
        <Route path="/qa/:id" element={<QnADetail />} />
      </Routes>
    </Router>
  );
}

export default App;
