import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/CRMLogo.png";
import { BsBarChartFill, BsHouseDoorFill } from "react-icons/bs";
import { BiSolidCategory, BiLogOut, BiCart } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import { IoSettings } from "react-icons/io5";

function VendorSidebar({ handleLogout }) {
  const navigate = useNavigate();
  const handelLogOutClick = () => {
    handleLogout();
    navigate("/");
  };

  const [leadMenuOpen] = useState(false);

  const [activeSubmenu] = useState(null);

  return (
    <nav
      className="navbar show navbar-vertical h-lg-screen navbar-expand-lg p-0 navbar-light border-bottom border-bottom-lg-0 border-end-lg"
      id="navbarVertical"
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler mx-2 p-1"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarCollapse"
          aria-controls="sidebarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <NavLink
          className={`navbar-brand nav-logo logo_ats py-lg-2 px-lg-6 m-0 d-flex align-items-center justify-content-center gap-3 ${leadMenuOpen || activeSubmenu ? "active" : ""
            }`}
          to="/"
        >
          <img src={Logo} alt="Logo" className="img-fluid sidebar-logo rounded-circle"
            style={{ background: "#fff", borderRadius: "5px", width: "50px", height: "50px" }} />
          <p className="text-white">Dealsmachi</p>
        </NavLink>
        <div className="collapse navbar-collapse" id="sidebarCollapse">
          <ul className="navbar-nav">
            {/* Dashboard */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">
                <BsBarChartFill /> Dashboard
              </NavLink>
            </li>

            {/* Home */}
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                <BsHouseDoorFill /> Home
              </NavLink>
            </li> */}
            {/* Category */}
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/category">
                <MdCategory /> Category
              </NavLink>
            </li> */}
            {/* Products */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">
                <BiSolidCategory /> Products
              </NavLink>
            </li>

            {/* Orders */}
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/orders">
                <BiCart /> Orders
              </NavLink>
            </li> */}


            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/dealcategory">
                <MdCategory /> Deal Category
              </NavLink>
            </li> */}

            {/* Settings */}
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/settings">
                <IoSettings /> Settings
              </NavLink>
            </li> */}
          </ul>
          <div className="mt-auto logutBtn">
            <div className="navbar-nav">
              <div className="nav-item">
                <button
                  to={"#"}
                  style={{ width: "100%" }}
                  className="nav-link ps-6"
                  onClick={handelLogOutClick}
                >
                  <BiLogOut />
                  &nbsp;&nbsp; Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default VendorSidebar;
