import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Admin from "./layouts/Admin";
import Client from "./layouts/Client";
import Vendor from "./layouts/Vendor";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isClientLogin, setIsClientLogin] = useState(false);
  const [isVendorLogin, setIsVendorLogin] = useState(false);

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", true);
    setIsAuthenticated(true);
  };

  const handleClientLogin = () => {
    localStorage.setItem("isClientLogin", true);
    setIsClientLogin(true);
  };

  const handleVendorLogin = () => {
    localStorage.setItem("isVendorLogin", true);
    setIsVendorLogin(true);
  };

  const handleLogout = async () => {
    try {
      toast.success("Logout Successfully");
      setIsAuthenticated(false);
      setIsClientLogin(false);
      setIsVendorLogin(false);
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("isClientLogin");
      localStorage.removeItem("isVendorLogin");
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("id");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      localStorage.removeItem("active");
    } catch (error) {
      toast.error("Logout Unsuccessfull");
    }
  };

  useEffect(() => {
    const isAuthenticatedFromStorage =
      localStorage.getItem("isAuthenticated");
    const isClientLoginFromStorage = localStorage.getItem("isClientLogin");
    const isVendorLoginFromStorage = localStorage.getItem("isVendorLogin");
    if (isAuthenticatedFromStorage === "true") {
      setIsAuthenticated(true);
    } else if (isClientLoginFromStorage === "true") {
      setIsClientLogin(true);
    } else if (isVendorLoginFromStorage === "true") {
      setIsVendorLogin(true);
    }
  }, []);

  return (
    <div>
      <Toaster
        toastOptions={{
          style: {
            background: "rgb(51 65 85)",
            color: "#fff",
          },
        }}
      />
      {isAuthenticated ? (
        <Admin handleLogout={handleLogout} />
      ) : isVendorLogin ? (
        <Vendor handleLogout={handleLogout} /> // Render Vendor layout if vendor is logged in
      ) : (
        <Client
          handleLogout={handleLogout}
          handleLogin={handleLogin}
          handleClientLogin={handleClientLogin}
          handleVendorLogin={handleVendorLogin} // Pass handleVendorLogin to Client for vendor login
          isClientLogin={isClientLogin}
        />
      )}
    </div>
  );
}

export default App;
