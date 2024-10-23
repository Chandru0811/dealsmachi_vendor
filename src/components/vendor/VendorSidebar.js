import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import deals from "../../assets/deals.png";
import { BsBarChartFill } from "react-icons/bs";
import { BiSolidCategory, BiLogOut } from "react-icons/bi";

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
      className="navbar show navbar-vertical navbar-expand-lg p-0 navbar-light border-bottom border-bottom-lg-0 border-end-lg"
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
          className={`navbar-brand nav-logo logo_ats py-lg-2 px-lg-6 m-0 d-flex align-items-center justify-content-center gap-3 ${
            leadMenuOpen || activeSubmenu ? "active" : ""
          }`}
          to="/"
          // style={{position:"fixed",top:"0", minWidth:'18.1%'}}
        >
          <img
            src={deals}
            alt="deals"
            className="img-fluid sidebar-logo rounded-circle"
            style={{
              background: "#fff",
              borderRadius: "5px",
              width: "45px",
              height: "45px",
            }}
          />
          <p className="text-white">Dealsmachi</p>
        </NavLink>
        <div
          className="collapse navbar-collapse"
          id="sidebarCollapse"
          // style={{ marginTop: "5rem" }}
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">
                <BsBarChartFill />
                Dashboard
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/slider">
                <BiSolidCategory />
                Slider
              </NavLink>
            </li> */}
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/banner">
                <BiSolidCategory />Banner
               
              </NavLink>
            </li> */}
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/categorygroup">
                <MdCategory />
                Category Groups
              </NavLink>
            </li> */}
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/categories">
                <BiSolidCategory />
                Categories
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/dealcategories">
                <BiSolidCategory />
                Deal Categories
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/product">
                <BiSolidCategory />
                Deals
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink className="nav-link" to="/shop">
                <TbShoppingCartFilled />
                Company
              </NavLink>
            </li> */}
          </ul>
          <div className="ps-4 mt-auto w-100 mb-4">
            <div className="navbar-nav">
              <div className="nav-item">
                <button
                  to={"#"}
                  style={{ width: "100%" }}
                  className="nav-link ps-6 logout_button"
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
