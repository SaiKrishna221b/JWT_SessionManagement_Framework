import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register"

function Router() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<div>Home</div>} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<div>Login</div>} />
                <Route path="/customer" element={<div>Customers</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
