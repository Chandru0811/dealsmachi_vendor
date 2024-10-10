import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import ImageURL from "../../../config/ImageURL";

function ProductsView() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [datas, setDatas] = useState([]);
  const [shopStatus, setShopStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleActivate = async () => {
    setLoadIndicator(true);
    try {
      const response = await api.post(`admin/deal/${id}/approve`);
      if (response.status === 200) {
        getData();
        toast.success("Product Activated Successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while activating the product.");
      console.error("Activation Error:", error);
    } finally {
      setLoadIndicator(false);
    }
  };

  const handleDeActive = async () => {
    setLoading(true);
    try {
      const response = await api.post(`admin/deal/${id}/disapprove`);
      if (response.status === 200) {
        getData();
        toast.success("Product DeActivated Successfully!");
        handleClose();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while activating the product.");
      console.error("DeActivation Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`admin/product/${id}`);
      setData(response.data.data);
      setDatas(response.data.data);
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
    <section className="px-4">
      {loading ? (
        <div className="loader-container">
          <div className="loader">
            <svg viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32"></circle>
            </svg>
          </div>
        </div>
      ) : (
        <div className="">
          <div className="card shadow border-0 mb-3">
            <div className="row p-3">
              <div className="d-flex justify-content-between align-items-center w-100">
                <div>
                  <h3>View Deals</h3>
                </div>
                <div>
                  <Link to="/products">
                    <button type="button" className="btn btn-light btn-sm me-2">
                      <span>Back</span>
                    </button>
                  </Link>
                  {shopStatus == "0" ? (
                    <button
                      type="button"
                      onClick={handleActivate}
                      className="btn btn-success btn-sm me-2"
                      disabled={loadIndicator}
                    >
                      {loadIndicator && (
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          aria-hidden="true"
                        ></span>
                      )}
                      Activate
                    </button>
                  ) : (
                    <button
                      onClick={handleOpenModal}
                      className="btn btn-danger btn-sm me-2"
                    >
                      Deactivate
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            className="container card shadow border-0"
            style={{ minHeight: "80vh" }}
          >
            <div className="row mt-5 p-3">
              {/* <div className="col-md-6 col-12">
                        <div className="row mb-3">
                            <div className="col-6 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                    <b>Category Group</b>
                                </p>
                            </div>
                            <div className="col-6">
                                <p className="text-muted text-sm">
                                    :{" "}
                                    {Array.isArray(datas) &&
                                        datas.map((category) =>
                                            parseInt(data.category_group_id) === category.id
                                                ? category.name || "--"
                                                : ""
                                        )}
                                </p>
                            </div>
                        </div>
                    </div> */}

              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Category Group</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : {data.categoryGroupName}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Category</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.categoryName}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Deal Type</b>
                    </p>
                  </div>
                  <div className="col-6">
                    {console.log("Deal Type Value:", data.deal_type)}{" "}
                    {/* Debugging */}
                    <p className="text-muted text-sm">
                      :{" "}
                      {data.deal_type === 1 || data.deal_type === "0"
                        ? "Product"
                        : data.deal_type === 2 || data.deal_type === "1"
                        ? "Service"
                        : data.deal_type === 3 || data.deal_type === "2"
                        ? "Product and Service"
                        : "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Brand</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.brand}</p>
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
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Original Price</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : {data.original_price}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Discounted Percentage</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : {data.discount_percentage}%
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Discounted Price</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : {data.discounted_price}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Start Date</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : {new Date(data.start_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>End Date</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      : {new Date(data.end_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Stock</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.stock}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>SKU</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data.sku}</p>
                  </div>
                </div>
              </div>
              {/* <div className="col-md-6 col-12">
                        <div className="row mb-3">
                            <div className="col-6 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                    <b></b>
                                </p>
                            </div>
                            <div className="col-6">
                                <p className="text-muted text-sm"></p>
                            </div>
                        </div>
                    </div> */}

              {/* <div className="col-md-6 col-12">
                        <div className="row mb-3">
                            <div className="col-6 d-flex justify-content-start align-items-center">
                                <p className="text-sm">
                                    <b>Image</b>
                                </p>
                            </div>
                            <div className="col-6">
                                <p className="text-muted text-sm">: <img
                                    src={`${ImageURL}${data.image_url1}`}
                                    alt="icon"
                                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                                /></p>
                            </div>
                        </div>
                    </div> */}
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Image 1</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      :{" "}
                      <img
                        src={`${ImageURL}${data.image_url1}`}
                        alt="icon"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Image 2</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      :{" "}
                      <img
                        src={`${ImageURL}${data.image_url2}`}
                        alt="icon"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Image 3</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      :{" "}
                      <img
                        src={`${ImageURL}${data.image_url3}`}
                        alt="icon"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Image 4</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      :{" "}
                      <img
                        src={`${ImageURL}${data.image_url4}`}
                        alt="icon"
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    </p>
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
      )}

      <Modal
        show={showModal}
        backdrop="static"
        keyboard={false}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Deactivate Deal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to deactivate this Deal?</Modal.Body>
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
    </section>
  );
}

export default ProductsView;
