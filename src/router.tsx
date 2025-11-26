import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Page from './pages/page'
import Page404 from "./pages/404";
import Login from "./pages/login";
import Register from "./pages/register";
import WithAuth from "./components/HOC/withauth";


class Router extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>

            <Route path="/" element={<Page />}></Route>
            <Route path="/page" element={<Page />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="*" element={<Page404 />}></Route>

        </Routes>
      </BrowserRouter>
    );
  }
}

export default WithAuth(Router);
