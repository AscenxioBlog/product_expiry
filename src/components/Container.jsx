import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import AddProduct from "./Addproduct";
import ProductList from "./ProductList";
import Settings from "./Settings";
import LoginPage from "./LoginPage";
import AddStaff from "./AddStaff";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";


function Container() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const sessionAuth = sessionStorage.getItem("isAuthenticated") === "true";
    const localAuth = localStorage.getItem("isAuthenticated") === "true";
    return sessionAuth || localAuth; // Return true if either storage indicates authentication
  });
  
  console.log(isAuthenticated)
  const [rememberMe, setRememberMe] = useState(false);
  
  const handleLogin = () => {
    setIsAuthenticated(true);
    if (rememberMe) {
      localStorage.setItem("isAuthenticated", "true"); // Persistent storage
    } else {
      sessionStorage.setItem("isAuthenticated", "true"); // Session-based storage
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    // localStorage.removeItem("isAuthenticated"); // Clear auth state
    // sessionStorage.removeItem("isAuthenticated");
    localStorage.clear()
    sessionStorage.clear()
  };

  return (
    <Router>
      <Routes>
      <Route path="/login" element={<LoginPage onLogin={handleLogin} rememberMe={rememberMe} setRememberMe={setRememberMe}/>} />
      <Route path="/password-reset" element={<ForgotPassword/>}/>
      <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={
            isAuthenticated ? (
              <Dashboard onLogout={handleLogout}/>
            ) : (
              <Navigate to="/login" replace />
            )
          }>
          <Route path="add-product" element={<AddProduct />} />
          <Route path="add-staff" element={<AddStaff />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Container;
