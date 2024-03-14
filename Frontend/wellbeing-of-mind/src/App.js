import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Articles from "./pages/Articles/Articles";
import ArticleDetail from "./pages/Articles/ArticleDetail";
import NoPage from "./pages/NoPage";
import TestsList from "./pages/Tests/TestsPage";
import AnxietyTest from "./pages/Tests/Test";
import LoginPage from "./pages/Login/LoginPage";
import RegisterPage from "./pages/Register/RegisterPage";
import ArticleForm from "./pages/Articles/NewArticlePage";
import AuthenticatedLayout from "./layout/AuthenticatedLayout";
import Homepage from "./pages/Home/Home";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

import "./App.css";

function App() {
  // State to manage the theme
  const [darkTheme, setDarkTheme] = useState(false);

  // Function to toggle the theme
  const toggleTheme = () => {
    setDarkTheme(prevTheme => !prevTheme);
  };

  const isAuthenticated = localStorage.getItem('token');

  return (
    <BrowserRouter>    
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <AuthenticatedLayout darkTheme={darkTheme} toggleTheme={toggleTheme} /> : <Layout darkTheme={darkTheme} toggleTheme={toggleTheme} />}
          >
            <Route index element={<Homepage />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/article/:articleId" element={<ArticleDetail />} />
            <Route path="/newarticle" element={<ArticleForm />} />
            <Route path="/tests" element={<TestsList />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/test/:testId" element={<AnxietyTest />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
