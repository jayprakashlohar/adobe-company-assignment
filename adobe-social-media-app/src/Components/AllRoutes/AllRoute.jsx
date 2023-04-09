import React from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "../Pages/Login";
import { Signup } from "../Pages/Signup";
import { PostList } from "../Dashboard/PostList";
import { SingleUser } from "../Dashboard/SingleUser";
import { UserList } from "../Pages/UserList";

const AllRoute = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/singleuser/:id" element={<SingleUser />}></Route>
        <Route path="/postlist" element={<PostList />}></Route>
        <Route path="/userlist" element={<UserList />}></Route>
      </Routes>
    </div>
  );
};

export { AllRoute };
