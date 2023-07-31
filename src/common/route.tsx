import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SplashPage from "../pages/SplashPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import HomePage from "../pages/HomePage";
import InventoryPage from "../pages/InventoryPage";
import CreateNftPage from "../pages/CreateNftPage";
import BookPage from "../pages/BookPage";
import AboutPage from "../pages/AboutPage";
import MyPage from "../pages/MyPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< SplashPage/>} />
        <Route path={'/signin'} element={<SignInPage />} />
        <Route path={'/signup'} element={<SignUpPage />} />
        <Route path={'/home'} element={<HomePage />} />
        <Route path={'/inventory'} element={<InventoryPage />} />
        <Route path={'/create'} element={<CreateNftPage />} />
        <Route path={'/book'} element={<BookPage />} />
        <Route path={'/about'} element={<AboutPage />} />
        <Route path={'/mypage'} element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;