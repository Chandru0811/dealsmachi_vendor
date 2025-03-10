import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import deals from "../../assets/deals.png";
import { BsBarChartFill } from "react-icons/bs";
import { BiSolidCategory, BiLogOut } from "react-icons/bi";
import { FaBoxOpen } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { AiFillPieChart } from "react-icons/ai";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";

function VendorSidebar({ handleLogout }) {
  const navigate = useNavigate();
  const loginType = localStorage.getItem("type");

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
          <div
            style={{
              background: "#fff",
              borderRadius: "50%",
              width: "45px",
              height: "45px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={deals}
              alt="deals"
              className="img-fluid sidebar-logo"
              style={{
                width: "40px",
                height: "40px",
              }}
            />
          </div>
          <p className="text-white">DealsMachi</p>
        </NavLink>
        <div
          className="collapse navbar-collapse"
          id="sidebarCollapse"
          // style={{ marginTop: "5rem" }}
        >
          <ul className="navbar-nav">
            {(loginType === "vendor" || loginType === "referrer-vendor") && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/dashboard">
                    <BsBarChartFill />
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/product">
                    <BiSolidCategory />
                    Deals
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/order">
                    <FaBoxOpen />
                    Orders
                  </NavLink>
                </li>
              </>
            )}
            {(loginType === "referrer" || loginType === "referrer-vendor") && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/referrer_dashboard">
                    <AiFillPieChart />
                    Referral Dashboard
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/my_vendors">
                    <FaUser />
                    My Vendors
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/earnings">
                    <RiMoneyRupeeCircleFill />
                    Earnings
                  </NavLink>
                </li>
              </>
            )}
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
