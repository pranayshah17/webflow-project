import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./Css/App.css";
// import Header from "./Header/Header";
import CardComponent from "./Component/CardComponent";
import ListItems from "./Component/ListItems";
import Layout from "./Layout";
import Login from "./Login/Login";
import RedirectToLogin from "./Login/RedirectedToLogin";
import RegistrationPage from "./Login/RegistartionPage";
import PrivateRoute from "./PrivateRoute";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Implement your login logic here
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    setIsLoggedIn(false);
  };

  return (
    <>
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<RedirectToLogin/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrationpage" element={<RegistrationPage />} />
        <Route path="/cardcomponent" element={<CardComponent />} />
        <Route path="/listitems" element={<ListItems  />} />
        <Route
          path="/card"
          element={
            <PrivateRoute>
              <CardComponent />
            </PrivateRoute>
          }
        />
      </Routes>
      </Layout>
    </BrowserRouter>
    </>
  );
}

export default App;
