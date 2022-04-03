import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ConfirmSignUp from "./Containers/ConfirmSignUp";
import { useState } from "react";
import Home from "./Containers/Home";
import Homepage from "./Containers/HomePage";
import SignIn from "./Containers/SignIn";

import Signup from "./Containers/Signup";
import FindMovie from "./Containers/FindMovie";

import AdminSignIn from "./Containers/adminsignin";

import SelectYear from "./Containers/SelectYear";
import SelectTypes from "./Containers/SelectType";

const App = () => {
  const [dataState, setDataState] = useState();
  const [gtype, SelectType] = useState();
  const [year, setYear] = useState();

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

  console.log("dataState-----------", dataState);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signin" element={<SignIn />}></Route>
          <Route path="/AdminSignin" element={<AdminSignIn />}></Route>

          <Route
            path="/Signup"
            element={<Signup dataFromSignUp={signUpData} />}
          />
          <Route
            path="/SelectType"
            element={<SelectTypes genreType={genreTypes} />}
          />
          {dataState && (
            <Route
              path="/confirmSignUp"
              element={<ConfirmSignUp dataToSignIn={dataState} />}
            />
          )}

          <Route path="/HomePage" element={<Homepage />} />
          {gtype && (
            <Route
              path="/SelectYear"
              element={<SelectYear selectedYear={selectedYear} gtype={gtype} />}
            />
          )}
          {year && (
            <Route
              path="/FindMovie"
              element={<FindMovie forMovies={year} />}
            />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
