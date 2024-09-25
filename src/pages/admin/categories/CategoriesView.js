import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import ImageURL from "../../../config/ImageURL";
import Modal from 'react-bootstrap/Modal';

function CategoriesView() {
  const [data, setData] = useState([]);
  console.log("first", data.id);
  const { id } = useParams();
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);

  const [shopStatus, setShopStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleClose = () => setShowModal(false);


  const getData = async () => {
    try {
      const response = await api.get(`admin/categories/${id}`);
      setData(response.data.data);
      setShopStatus(response.data.data.active);
    } catch (error) {
      toast.error("Error Fetching Data ", error);
    }
  };


  const fetchData = async () => {
    // setLoading(true);
    try {
      const response = await api.get("/admin/categoryGroup");
      setDatas(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleActivate = async () => {
    setLoading(true);
    try {
      const response = await api.post(`admin/category/${id}/approve`);
      if (response.status === 200) {
        getData();
        toast.success("Category activated successfully!");
      } else {
        toast.error("Failed to activate Category.");
      }
    } catch (error) {
      toast.error("An error occurred while activating the Category.");
      console.error("Activation Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
    fetchData();
  }, [id]);

  return (
    <div className="container-fluid ">
      <div className="card shadow border-0 mb-3">
        <div className="row p-3">
          <div className="d-flex justify-content-between align-items-center w-100">
            <div>
              <h3>View Category</h3>
            </div>
            <div>
              <Link to="/categories">
                <button type="button" className="btn btn-light btn-sm me-2">
                  <span>Back</span>
                </button>
              </Link>
              {shopStatus === 0 && (
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
              )}
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
                    <b>Category Group Id</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    :{" "}
                    {datas &&
                      datas.map((category) =>
                        parseInt(data.category_group_id) === category.id
                          ? category.name || "--"
                          : ""
                      )}
                  </p>
                </div>
              </div>
            </div>
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
            <div className="col-md-6 col-12">
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
            </div>
            {/* <div className="col-md-6 col-12">
              <div className="row mb-3">
                <div className="col-6 d-flex justify-content-start align-items-center">
                  <p className="text-sm">
                    <b>Active</b>
                  </p>
                </div>
                <div className="col-6">
                  <p className="text-muted text-sm">
                    : {data.active == 0 ? 'Active' : data.active == 1 ? 'Inactive' : ''}
                  </p>
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
                  <p className="text-muted text-sm">: <img
                    src={`${ImageURL}${data.icon}`}
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
    </div>
  );
}

export default CategoriesView;
