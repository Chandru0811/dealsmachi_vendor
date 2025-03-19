import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import Image from "../../../assets/tv.png"; // Ensure you have a fallback if the image is not available
import toast from "react-hot-toast";
import api from "../../../config/URL";
import ImageURL from "../../../config/ImageURL";
import { FaRegCopy } from "react-icons/fa";
import { LuCopyCheck } from "react-icons/lu";
import Modal from "react-bootstrap/Modal";

function ProductView() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadIndicator, setLoadIndicator] = useState(false);
  const [shopStatus, setShopStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showActiveModal, setShowActiveModal] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [specialPrize, setSpecialPrize] = useState(null);
  const [end_date, setEndDate] = useState("");

  const handleActivate = () => {
    setShowActiveModal(true);
  };

  const handleCloseModal = () => {
    setShowActiveModal(false);
    setSpecialPrize(null);
    setEndDate("");
  };

  const handleConfirmActivate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      special_price: specialPrize === "1",
      ...(specialPrize === "1" && { end_date }),
    };

    try {
      const response = await api.post(`admin/deal/${id}/approve`, payload);
      if (response.status === 200) {
        getData();
        toast.success("Product Activated Successfully!");
        handleCloseModal();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred while activating the product.");
      console.error("Activation Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleConfirmActivate = async () => {
  //   setLoadIndicator(true);
  //   try {
  //     const response = await api.post(`admin/deal/${id}/approve`);
  //     if (response.status === 200) {
  //       getData();
  //       toast.success("Product Activated Successfully!");
  //       handleCloseModal();
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     toast.error("An error occurred while activating the product.");
  //     console.error("Activation Error:", error);
  //   } finally {
  //     setLoadIndicator(false);
  //   }
  // };

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
      const { additional_details, ...rest } = response.data.data;

      const decodedAdditionalDetails = additional_details
        ? JSON.parse(additional_details)
        : [];
      setData({
        ...rest,
        additional_details: decodedAdditionalDetails,
      });
      setShopStatus(response.data.data.active);
    } catch (error) {
      toast.error("Error Fetching Data ", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [id]);

  const handleCopy = async () => {
    try {
      if (data?.coupon_code) {
        await navigator.clipboard.writeText(data.coupon_code);
        setIsCopied(true); // Set the copied state to true
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  function extractVideoId(url) {
    const regExp =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/([a-zA-Z0-9_-]+))|youtu\.be\/([a-zA-Z0-9_-]+))/;
    const match = url?.match(regExp);
    return match ? match[1] || match[2] : null;
  }

  return (
    <section className="px-4">
      <>
        <div className="card shadow border-0 mb-3">
          <div className="row p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="h4 ls-tight">
                View Deals &nbsp;
                {data.special_price === 1 && new Date(data.end_date) > new Date() ? (
                  <>
                    <span
                      className="dot"
                      style={{
                        backgroundColor: "#3598f0",
                        width: "10px",
                        height: "10px",
                        display: "inline-block",
                        borderRadius: "50%",
                        marginRight: "3px",
                      }}
                    >
                    </span><span style={{ fontSize:"12px" }}>Special price</span>
                  </>
                ) : (
                  <></>
                )}
                <span>
                  {data?.ownerEmailVerifiedAt !== null && (
                    <i
                      className="fa-duotone fa-solid fa-badge-check"
                      style={{ color: "green" }}
                    ></i>
                  )}
                </span>
              </h1>
              <div>
                <Link to="/products">
                  <button type="button" className="btn btn-light btn-sm me-2">
                    <span>Back</span>
                  </button>
                </Link>
                {shopStatus === 0 || shopStatus === "0" ? (
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
                {/* Modal */}
                <Modal show={showActiveModal} onHide={handleCloseModal}>
                  <Modal.Header closeButton></Modal.Header>
                  <Modal.Body>
                    <form onSubmit={handleConfirmActivate}>
                      <div className="mb-3">
                        <label className="form-label">Special Prize</label>
                        <div>
                          <input
                            type="radio"
                            id="special_price_yes"
                            name="special_price"
                            value="1"
                            checked={specialPrize === "1"}
                            onChange={() => setSpecialPrize("1")}
                            className="form-check-input"
                          />
                          <label
                            htmlFor="special_price_yes"
                            className="form-check-label ms-2"
                          >
                            Yes
                          </label>

                          <input
                            type="radio"
                            id="special_price_no"
                            name="special_price"
                            value="0"
                            checked={specialPrize === "0"}
                            onChange={() => setSpecialPrize("0")}
                            className="form-check-input ms-3"
                          />
                          <label
                            htmlFor="special_price_no"
                            className="form-check-label ms-2"
                          >
                            No
                          </label>
                        </div>
                      </div>

                      {specialPrize === "1" && (
                        <div className="mb-3">
                          <label className="form-label" htmlFor="end_date">
                            End Date
                          </label>
                          <input
                            type="date"
                            id="end_date"
                            className="form-control"
                            value={
                              end_date ||
                              (data?.end_date
                                ? data.end_date.split("T")[0]
                                : "")
                            }
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                        </div>
                      )}

                      {/* <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                      >
                        {loading ? "Saving..." : "Save"}
                      </button> */}
                    </form>
                  </Modal.Body>

                  <Modal.Footer>
                    <button
                      className="btn btn-light btn-sm me-2"
                      onClick={handleCloseModal}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-success btn-sm me-2"
                      onClick={handleConfirmActivate}
                      disabled={loadIndicator}
                    >
                      {loadIndicator && (
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          aria-hidden="true"
                        ></span>
                      )}{" "}
                      {loading ? "Saving..." : "Save"}
                      Activate
                    </button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
        <div
          className="container card shadow border-0"
          style={{ minHeight: "80vh" }}
        >
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
              <div className="d-flex justify-content-end align-items-center mt-2">
                <p>
                  <span>Coupon Code</span>&nbsp;&nbsp;:
                  <span className="text-muted" style={{ fontSize: "24px" }}>
                    {data?.coupon_code}
                  </span>
                </p>
                &nbsp;&nbsp;
                <span
                  onClick={handleCopy}
                  style={{ cursor: "pointer" }}
                  title={isCopied ? "Copied!" : "Click to copy"}
                >
                  {isCopied ? <LuCopyCheck /> : <FaRegCopy />}
                </span>
              </div>
              <div className="row mt-5 p-3">
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">Category Group</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data?.categoryGroupName}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">Category</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data?.categoryName}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">Deal Type</p>
                    </div>
                    <div className="col-6">
                      {console.log("Deal Type Value:", data?.deal_type)}{" "}
                      {/* Debugging */}
                      <p className="text-muted text-sm">
                        :{" "}
                        {data?.deal_type === 1 || data?.deal_type === "1"
                          ? "Product"
                          : data?.deal_type === 2 || data?.deal_type === "2"
                          ? "Service"
                          : data?.deal_type === 3 || data?.deal_type === "3"
                          ? "Product and Service"
                          : "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">Brand</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data?.brand}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">Name</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data?.name}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">Original Price</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        :{" "}
                        {data?.original_price &&
                          new Intl.NumberFormat("en-IN", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                            useGrouping: true,
                          }).format(parseFloat(data?.original_price))}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">Discounted Price</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        :{" "}
                        {data?.discounted_price &&
                          new Intl.NumberFormat("en-IN", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                            useGrouping: true,
                          }).format(parseFloat(data?.discounted_price))}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">Discounted Percentage</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        :{" "}
                        {data?.discount_percentage &&
                          new Intl.NumberFormat("en-IN", {
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 2,
                            useGrouping: true,
                          }).format(parseFloat(data?.discount_percentage))}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">Variant</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        :{" "}
                        {data?.varient?.split(",").map((variant, index) => (
                          <div
                            key={index}
                            className="badge badge-success badge-outlined mx-1"
                          >
                            {variant.trim()}
                          </div>
                        ))}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">Delivery Days</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        : {data?.delivery_days} Days
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">Start Date</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        :{" "}
                        {data?.start_date
                          ? new Date(data?.start_date).toLocaleDateString()
                          : ""}
                      </p>
                      {/* <p className="text-muted text-sm">
                        :{" "}
                        {data?.start_date}
                      </p> */}
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">End Date</p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">
                        :{" "}
                        {data?.end_date
                          ? new Date(data?.end_date).toLocaleDateString()
                          : ""}
                      </p>
                      {/* <p className="text-muted text-sm">
                        :{" "}
                        {data?.end_date}
                      </p> */}
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      Stock
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data?.stock}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      SKU
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data?.sku}</p>
                  </div>
                </div>
              </div> */}
                {/* <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      Coupon Code
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">: {data?.coupon_code}</p>
                  </div>
                </div>
              </div> */}
                <div className="col-12">
                  <div className="row mb-3">
                    <div className="col-3 d-flex justify-content-start align-items-center">
                      <p className="text-sm">Description</p>
                    </div>
                    <div className="col-9">
                      <p className="text-muted text-sm">
                        : {data?.description}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div className="row mb-3">
                    <div className="col-3 d-flex justify-content-start align-items-center">
                      <p className="text-sm">Specification</p>
                    </div>
                    <div className="col-9">
                      <p className="text-muted text-sm">
                        : {data?.specifications}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row mt-5 p-3">
                  {data.product_media
                    ?.sort((a, b) => a.order - b.order)
                    .map((item, index) => (
                      <div className="col-md-4 col-12 mb-3" key={item.id}>
                        {item.type === "image" ? (
                          <>
                            <p className="text-sm">Thumbnail {index + 1}</p>
                            <img
                              src={`${ImageURL}${
                                item.resize_path.startsWith("/")
                                  ? item.resize_path
                                  : "/" + item.resize_path
                              }`}
                              alt={`Media ${index + 1}`}
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </>
                        ) : item.type === "video" ? (
                          <>
                            <p className="text-sm">Thumbnail {index + 1}</p>
                            <div
                              className="d-flex gap-4"
                              id={`video-container-${index}`}
                            >
                              {item.resize_path && (
                                <iframe
                                  src={`https://www.youtube.com/embed/${extractVideoId(
                                    item.resize_path
                                  )}`}
                                  width="280"
                                  height="210"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  title={`Video ${index + 1}`}
                                ></iframe>
                              )}
                            </div>
                          </>
                        ) : null}
                      </div>
                    ))}
                </div>
              </div>
            </>
          )}
        </div>

        <Modal
          show={showModal}
          backdrop="static"
          keyboard={false}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Deactivate Deal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to deactivate this Deal?
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
    </section>
  );
}

export default ProductView;
