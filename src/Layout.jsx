import { useLocation } from "react-router-dom";
import Header from "./Header/Header";

const Layout = ({ children }) => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/login"; // Adjust this path to your login page route
    const isRegistrationPage = location.pathname === "/registrationpage"
    return (
      <div>
        {!isLoginPage && !isRegistrationPage && <Header />}
        {children}

      </div>
    );
  };
  
  export default Layout;