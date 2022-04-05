import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ConfirmSignUp from "./Containers/ConfirmSignUp";
import { useState } from "react";
import Home from "./Containers/Home";
import Homepage from "./Containers/HomePage";
import SignIn from "./Containers/SignIn";
import Search from "./Containers/Search";
import SeeMovie from "./Containers/SeeMovie";

import Signup from "./Containers/Signup";
import FindMovie from "./Containers/FindMovie";

import AdminSignIn from "./Containers/adminsignin";

import SelectYear from "./Containers/SelectYear";
import SelectTypes from "./Containers/SelectType";
import Signout from "./Containers/Signout";
import Profile from "./Containers/Profile";
import Request from "./Containers/Request";

const App = () => {
  const [dataState, setDataState] = useState();
  const [gtype, SelectType] = useState();
  const [year, setYear] = useState();
  const [title, setTitle] = useState();
  const token = localStorage.getItem("token");

  const signUpData = (data) => {
    console.log("***********", data);
    setDataState(data);
  };

  const genreTypes = (types) => {
    console.log("genreTypes====", types);
    SelectType(types);
  };
  const selectedYear = (years) => {
    console.log("props from selected year====", years);
    setYear(years);
  };
  const dataFromSearch = (title) => {
    console.log("props from search====", title);
    setTitle(title);
  };

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
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
