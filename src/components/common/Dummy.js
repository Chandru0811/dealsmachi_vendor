import React, { useState } from "react";
import { BsHandbag } from "react-icons/bs";
import { CiGlobe } from "react-icons/ci";
import { GrCurrency } from "react-icons/gr";
import { PiVanFill } from "react-icons/pi";
import { MdAccessTime } from "react-icons/md";
import Store from "./Store";
import Location from "./Location";
import StorePolicy from "./StorePolicy";
import StoreHours from "./StoreHours";
import Payment from "./Payment";

function Settings() {
  const [selectedItem, setSelectedItem] = useState("Shop");
  const [showModal, setShowModal] = useState(false); // state for modal visibility

  const handleItemClick = (item) => {
    setSelectedItem(item);
    if (item === "Location") {
      setShowModal(true); // Show modal when "Location" is clicked
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close modal
  };

  return (
    <section className="px-4">
      <div className="card shadow border-0 mb-3">
        <div className="row p-3">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div>
              {!selectedItem && <h3 className="mb-0">Settings</h3>}
              {selectedItem === "Shop" && <h3>General Settings</h3>}
              {selectedItem === "Location" && <h3>Shop Address</h3>}
              {selectedItem === "Payment" && <h3>Payment Settings</h3>}
              {selectedItem === "Shop Policies" && <h3>Policies Settings</h3>}
              {selectedItem === "Shop Hours" && <h3>Hours Settings</h3>}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Location Settings</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCloseModal}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* Location content inside modal */}
                <Location />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className="container card shadow border-0"
        style={{ minHeight: "90vh" }}
      >
        <div className="row mt-5">
          <div
            className="col-md-3 col-12 card shadow h-50"
            style={{ zIndex: "0" }}
          >
            <div className="dropdown-menu w-100 p-3">
              <div
                className={`dropdown-item ps-5 ms-5 ${
                  selectedItem === "Shop" ? "active" : ""
                }`}
                onClick={() => handleItemClick("Shop")}
              >
                <BsHandbag />&nbsp;&nbsp; Company
              </div>
              <div className="dropdown-divider"></div>
              <div
                className={`dropdown-item ps-5 ms-5 ${
                  selectedItem === "Location" ? "active" : ""
                }`}
                onClick={() => handleItemClick("Location")}
              >
                <CiGlobe /> &nbsp;&nbsp;Location
              </div>
              <div className="dropdown-divider"></div>
              {/* <div
                className={`dropdown-item ps-5 ms-5 ${
                  selectedItem === "Payment" ? "active" : ""
                }`}
                onClick={() => handleItemClick("Payment")}
              >
                <GrCurrency /> &nbsp;&nbsp;Payment
              </div> */}
              {/* <div className="dropdown-divider"></div> */}
              <div
                className={`dropdown-item ps-5 ms-5 ${
                  selectedItem === "Shop Policies" ? "active" : ""
                }`}
                onClick={() => handleItemClick("Shop Policies")}
              >
                <PiVanFill /> &nbsp;&nbsp;Company Policies
              </div>
              <div className="dropdown-divider"></div>
              <div
                className={`dropdown-item ps-5 ms-5 ${
                  selectedItem === "Shop Hours" ? "active" : ""
                }`}
                onClick={() => handleItemClick("Shop Hours")}
              >
                <MdAccessTime /> &nbsp;&nbsp;Company Hours
              </div>
            </div>
          </div>
          <div className="col-md-9 col-12 ">
            <div className="">
              {selectedItem === "Shop" && <Store />}
              {selectedItem === "Location" && !showModal && <Location />}
              {selectedItem === "Payment" && <Payment />}
              {selectedItem === "Shop Policies" && <StorePolicy />}
              {selectedItem === "Shop Hours" && <StoreHours />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Settings;