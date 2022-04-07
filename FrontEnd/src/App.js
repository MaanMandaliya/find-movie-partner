import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ConfirmSignUp from "./Containers/UserScreens/ConfirmSignUp";
import { useState } from "react";
import Home from "./Containers/Home";
import Homepage from "./Containers/UserScreens/HomePage";
import SignIn from "./Containers/UserScreens/SignIn";
import Search from "./Containers/UserScreens/Search";
import SeeMovie from "./Containers/UserScreens/SeeMovie";

import Signup from "./Containers/UserScreens/Signup";
import FindMovie from "./Containers/UserScreens/FindMovie";

import AdminSignIn from "./Containers/AdminScreens/adminsignin";

import SelectYear from "./Containers/UserScreens/SelectYear";
import SelectTypes from "./Containers/UserScreens/SelectType";
import Signout from "./Containers/UserScreens/Signout";
import Profile from "./Containers/UserScreens/Profile";
import Request from "./Containers/UserScreens/Request";
import AdminHome from "./Containers/AdminScreens/AdminHome";
import AllUsers from "./Containers/AdminScreens/AllUsers";
import UserRequests from "./Containers/AdminScreens/UserRequests";
import AdminProfile from "./Containers/AdminScreens/AdminProfile";

const App = () => {
  const [dataState, setDataState] = useState();
  const [gtype, SelectType] = useState();
  const [year, setYear] = useState();
  const [title, setTitle] = useState();

  const signUpData = (data) => {
    setDataState(data);
  };

  const genreTypes = (types) => {
    SelectType(types);
  };
  const selectedYear = (years) => {
    setYear(years);
  };
  const dataFromSearch = (title) => {
    setTitle(title);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/AllUsers" element={<AllUsers />} />
          <Route path="/AdminProfile" element={<AdminProfile />} />
          <Route path="/UserRequests" element={<UserRequests />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/Signin" element={<SignIn />}></Route>
          <Route path="/AdminSignin" element={<AdminSignIn />}></Route>
          <Route
            path="/Search"
            element={<Search dataFromSearch={dataFromSearch} />}
          ></Route>
          <Route
            path="/Signup"
            element={<Signup dataFromSignUp={signUpData} />}
          />
          <Route path="/Signout" element={<Signout />} />
          <Route
            path="/SelectType"
            element={<SelectTypes genreType={genreTypes} />}
          />
          <Route path="/Request" element={<Request />} />
          {dataState && (
            <Route
              path="/confirmSignUp"
              element={<ConfirmSignUp dataToSignIn={dataState} />}
            />
          )}

          <Route path="/Profile" element={<Profile />} />
          {title && (
            <Route path="/SeeMovie" element={<SeeMovie title={title} />} />
          )}

          <Route path="/HomePage" element={<Homepage />} />
          {gtype && (
            <Route
              path="/SelectYear"
              element={<SelectYear selectedYear={selectedYear} gtype={gtype} />}
            />
          )}
          {year && (
            <Route path="/FindMovie" element={<FindMovie forMovies={year} />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
