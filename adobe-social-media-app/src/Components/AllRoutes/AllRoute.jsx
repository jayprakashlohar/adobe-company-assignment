import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../Pages/Login";
import { Signup } from "../Pages/Signup";

const AllRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
};

export { AllRoute };
