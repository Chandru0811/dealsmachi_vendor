import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import cat1 from "../../../assets/category5.png";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import ImageURL from "../../../config/ImageURL";
import Modal from 'react-bootstrap/Modal';

function CategoryGroupView() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  console.log("first", data.icon)
  const [loading, setLoading] = useState(false);

  const [shopStatus, setShopStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleClose = () => setShowModal(false);


  const getData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`admin/categoryGroup/${id}`);
      setData(response.data.data);
      setShopStatus(response.data.data.active);
    } catch (error) {
      toast.error("Error Fetching Data ", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <div className="container-fluid minHeight">
      {loading ? (
        <div className="loader-container">
          <div className="loader">
            <svg viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32"></circle>
            </svg>
          </div>
        </div>
      ) : (
        <>
          <div className="card shadow border-0 mb-3">
            <div className="row p-3">
              <div className="d-flex justify-content-between align-items-center w-100">
                <div>
                  <h3>View Category Group</h3>
                </div>
                <div>
                  <Link to="/categorygroup">
                    <button type="button" className="btn btn-light btn-sm me-2">
                      <span>Back</span>
                    </button>
                  </Link>
                  {/* {shopStatus === false ? (
                <button
                  type="button"
                  onClick={handleActivate}
                  className="btn btn-success btn-sm me-2" disabled={loading}
                >
                  {loading && (
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      aria-hidden="true"
                    ></span>
                  )}
                  Activate
                </button>
              ) : <></>}

              {shopStatus == false ? (
                <button
                  onClick={handleOpenModal}
                  className="btn btn-danger btn-sm me-2"
                >
                  Deactivate
                </button>
              ) : <></>} */}
                </div>
              </div>
            </div>
          </div>
          <div className="card shadow border-0 my-2" style={{ minHeight: "80vh" }}>
            <div className="container">
              <div className="row mt-5 p-3">
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Name</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data.name}</p>
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Slug</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">: {data.slug}</p>
                </div>
              </div>
            </div> */}
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Order</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data.order}</p>
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Active</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">:  {data.active === true ? 'Active' : 'Inactive'}</p>
                </div>
              </div>
            </div> */}
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Icon</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data.icon}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Image</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: <img
                        src={`${ImageURL}${data.image_path}`}
                        alt="Shop Logo"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      /></p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row mb-3">
                    <div className="col-3 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Description</b>
                      </p>
                    </div>
                    <div className="col-9">
                      <p className="text-muted text-sm">: {data.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <Modal show={showModal} backdrop="static" keyboard={false} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deactivate Shop</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to deactivate this shop?
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-sm btn-button' onClick={handleClose}>
            Close
          </button>
          <button className='btn-sm btn-danger'
            type="submit" onClick={handleDeActive}
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
      </Modal> */}
        </>
      )}
    </div>
  );
}

export default CategoryGroupView;