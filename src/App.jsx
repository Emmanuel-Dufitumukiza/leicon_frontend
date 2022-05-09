import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router-dom";
import Customers from "./components/Customers";
import Tables from "./components/Tables";
import Home from './Users/Home';
import Buy from './Users/Buy';
import MyGate from './Users/MyGate';
import Login from "./components/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/customers/new" exact element={<Customers />} />
        <Route path="/customers" exact element={<Tables />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order" element={<Buy />} />
        <Route path="/mygate" element={<MyGate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
