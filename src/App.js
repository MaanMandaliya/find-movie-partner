import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ConfirmSignUp from "./Containers/ConfirmSignUp";
import { useState } from "react";
import Home from "./Containers/Home";
import Homepage from "./Containers/HomePage";
import SignIn from "./Containers/SignIn";

import Signup from "./Containers/Signup";

const App = () => {
  const [dataState, setDataState] = useState();

  const signUpData = (data) => {
    console.log("***********", data);
    setDataState(data);
  };
  console.log("dataState-----------", dataState);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signin" element={<SignIn />}></Route>

          <Route
            path="/Signup"
            element={<Signup dataFromSignUp={signUpData} />}
          />
          {dataState && (
            <Route
              path="/confirmSignUp"
              element={<ConfirmSignUp dataToSignIn={dataState} />}
            />
          )}

          <Route path="/HomePage" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
