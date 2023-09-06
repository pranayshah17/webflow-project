import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./Css/App.css";
// import Header from "./Header/Header";
import CardComponent from "./Component/CardComponent";
import ListItems from "./Component/ListItems";
import Header from "./Header/Header";
import Login from "./Login/Login";
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
        <Header/>
    <BrowserRouter>
      <Routes>
        {isLoggedIn && <Header />}
        <Route path="/" element={<Login/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/registrationpage" element={<RegistrationPage />} />
        <Route path="/cardcomponent" element={<CardComponent />} />
        <Route path="/listitems" element={<ListItems />} />
        <Route
          path="/card"
          element={
            <PrivateRoute>
              <CardComponent />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
