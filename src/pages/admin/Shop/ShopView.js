import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsHandbag } from "react-icons/bs";
import { CiGlobe } from "react-icons/ci";
import { PiVanFill } from "react-icons/pi";
import { MdAccessTime } from "react-icons/md";
// import { GrCurrency } from "react-icons/gr";
import Stores from "./Stores";
import Locations from "./Locations";
import Payments from "./Payments";
import ShopPolicies from "./ShopPolicies";
import ShopHours from "./ShopHours";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import Modal from "react-bootstrap/Modal";
import { TiShoppingCart } from "react-icons/ti";
import Products from "./Products";
import { FaRegUserCircle } from "react-icons/fa";
import LoginDetails from "./LoginDetails";

function ShopView() {
  const { id } = useParams();
  const [selectedItem, setSelectedItem] = useState("Shop");
  const [shopStatus, setShopStatus] = useState("");
  const [isDirect, setisDirect] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleDeActive = async () => {
    setLoading(true);
    try {
      const response = await api.post(`admin/shop/${id}/deactivate`);
      if (response.status === 200) {
        handleClose();
        getData();
        toast.success("Shop deactivated successfully!");
      } else {
        toast.error("Failed to deactivate shop.");
      }
    } catch (error) {
      toast.error("An error occurred while deactivating the shop.");
      console.error("Deactivation Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleActivate = async () => {
    setLoading(true);
    try {
      const response = await api.post(`admin/shop/${id}/activate`);
      if (response.status === 200) {
        getData();
        toast.success("Shop activated successfully!");
      } else {
        toast.error("Failed to activate shop.");
      }
    } catch (error) {
      toast.error("An error occurred while activating the shop.");
      console.error("Activation Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDirectShop = async () => {
    setLoading(true);
    try {
      const response = await api.post(`admin/shop/${id}/direct`);
      if (response.status === 200) {
        setisDirect(1); 
        toast.success("Shop has been successfully set as a direct shop.");
      } else {
        toast.error("Failed to set as direct shop.");
      }
    } catch (error) {
      toast.error("An error occurred while setting shop as direct.");
    } finally {
      setLoading(false);
    }
  };

  const handleIndirectShop = async () => {
    setLoading(true);
    try {
      const response = await api.post(`admin/shop/${id}/indirect`);
      if (response.status === 200) {
        setisDirect(0); 
        toast.success("Shop has been successfully set as an indirect shop.");
      } else {
        toast.error("Failed to set as indirect shop.");
      }
    } catch (error) {
      toast.error("An error occurred while setting shop as indirect.");
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    setLoadIndicator(true);
    try {
      const response = await api.get(`admin/shop/${id}/details`);
      setShopStatus(response.data.data.active);
      setisDirect(response.data.data.is_direct);
    } catch (error) {
      toast.error(error.data.message);
    }
    setLoadIndicator(false);
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <section className="px-4">
      {loadIndicator ? (
        <div className="loader-container">
          <div className="loader">
            <svg viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32"></circle>
            </svg>
          </div>
        </div>
      ) : (
        <>
          <div className="border-0 mb-3">
            <div className="row p-3">
              <div className="d-flex justify-content-between align-items-center w-100">
                <div>
                  {selectedItem === "Shop" && (
                    <h3 className="ls-tight">General Settings</h3>
                  )}
                  {selectedItem === "Location" && (
                    <h3 className="ls-tight">Shop Address</h3>
                  )}
                  {/* {selectedItem === "Payment" && <h3 className="ls-tight">Payment Settings</h3>} */}
                  {selectedItem === "Shop Policies" && (
                    <h3 className="ls-tight">Policies Settings</h3>
                  )}
                  {selectedItem === "Shop Hours" && (
                    <h3 className="ls-tight">Hours Settings</h3>
                  )}
                  {selectedItem === "Products" && (
                    <h3 className="ls-tight">Products</h3>
                  )}
                  {selectedItem === "Login Details" && (
                    <h3 className="ls-tight">Login Details</h3>
                  )}
                </div>
                <div>
                  <Link to="/shop">
                    <button type="button" className="btn btn-light btn-sm me-2">
                      <span>Back</span>
                    </button>
                  </Link>

                  {isDirect === 1 || isDirect === "1" ? (
                    <button
                      type="button"
                      onClick={handleIndirectShop}
                      className="btn btn-danger btn-sm me-2"
                    >
                      In-Direct
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleDirectShop}
                      className="btn btn-success btn-sm me-2"
                      disabled={loading}
                    >
                      {loading && (
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          aria-hidden="true"
                        ></span>
                      )}
                      Direct
                    </button>
                  )}

                  {/* {shopStatus == 0 ? (
                    <button
                      type="button"
                      onClick={handleActivate}
                      className="btn btn-success btn-sm me-2"
                      disabled={loading}
                    >
                      {loading && (
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          aria-hidden="true"
                        ></span>
                      )}
                      Activate
                    </button>
                  ) : (
                    <></>
                  )}

                  {shopStatus == 1 ? (
                    <button
                      onClick={handleOpenModal}
                      className="btn btn-danger btn-sm me-2"
                    >
                      Deactivate
                    </button>
                  ) : (
                    <></>
                  )} */}
                </div>
              </div>
            </div>
          </div>
          <div
            className="container card shadow border-0"
            style={{ minHeight: "80vh" }}
          >
            <div className="row mt-5">
              <div className="col-md-3 col-12">
                <div className="dropdown-menu p-3" style={{ zIndex: "1" }}>
                  <div
                    className={`dropdown-item ${
                      selectedItem === "Shop" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("Shop")}
                  >
                    <BsHandbag /> Shop
                  </div>
                  <div className="dropdown-divider"></div>
                  <div
                    className={`dropdown-item ${
                      selectedItem === "Location" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("Location")}
                  >
                    <CiGlobe /> Location
                  </div>
                  {/* <div className="dropdown-divider"></div>
                  <div
                    className={`dropdown-item ${selectedItem === "Payment" ? "active" : ""
                      }`}
                    onClick={() => handleItemClick("Payment")}
                  >
                    <GrCurrency /> Payment
                  </div> */}
                  <div className="dropdown-divider"></div>
                  <div
                    className={`dropdown-item ${
                      selectedItem === "Shop Policies" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("Shop Policies")}
                  >
                    <PiVanFill /> Shop Policies
                  </div>
                  <div className="dropdown-divider"></div>
                  <div
                    className={`dropdown-item ${
                      selectedItem === "Shop Hours" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("Shop Hours")}
                  >
                    <MdAccessTime /> Shop Hours
                  </div>
                  <div className="dropdown-divider"></div>
                  <div
                    className={`dropdown-item ${
                      selectedItem === "Login Details" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("Login Details")}
                  >
                    <FaRegUserCircle /> Login Details
                  </div>
                  <div className="dropdown-divider"></div>
                  <div
                    className={`dropdown-item ${
                      selectedItem === "Products" ? "active" : ""
                    }`}
                    onClick={() => handleItemClick("Products")}
                  >
                    <TiShoppingCart /> Products
                  </div>
                </div>
              </div>

              <div className="col-md-9 col-12">
                <div>
                  {selectedItem === "Shop" && <Stores />}
                  {selectedItem === "Location" && <Locations />}
                  {selectedItem === "Payment" && <Payments />}
                  {selectedItem === "Shop Policies" && <ShopPolicies />}
                  {selectedItem === "Shop Hours" && <ShopHours />}
                  {selectedItem === "Login Details" && <LoginDetails />}
                  {selectedItem === "Products" && <Products />}
                </div>
              </div>
            </div>
          </div>
          <Modal
            show={showModal}
            backdrop="static"
            keyboard={false}
            onHide={handleClose}
          >
            <Modal.Header closeButton>
              <Modal.Title>Deactivate Company</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you sure you want to deactivate this Company?
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-sm btn-button" onClick={handleClose}>
                Close
              </button>
              <button
                className="btn-sm btn-danger"
                type="submit"
                onClick={handleDeActive}
                disabled={loading}
              >
                {loading && (
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    aria-hidden="true"
                  ></span>
                )}
                Deactivate
              </button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </section>
  );
}

export default ShopView;
