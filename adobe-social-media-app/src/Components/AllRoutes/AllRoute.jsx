import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../Pages/Login";
import { Signup } from "../Pages/Signup";
import { Navbar } from "../Navbar/Navbar";
import { UserList } from "../Dashboard/UserList";
import { PostList } from "../Dashboard/PostList";

const AllRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/navbar" element={<Navbar />}></Route>
        <Route path="/userlist" element={<UserList />}></Route>
        <Route path="/postlist" element={<PostList />}></Route>
      </Routes>
    </div>
  );
};

export { AllRoute };
