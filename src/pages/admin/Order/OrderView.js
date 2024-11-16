import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import noImage from "../../../assets/noimage.png";
import toast from "react-hot-toast";
import api from "../../../config/URL";
import ImageURL from "../../../config/ImageURL";

function OrderView() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log("first:", data);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/admin/order/${id}`);
      setData(response.data.data);
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
        <div>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center mb-4">
              <p className="d-flex justify-content-center text-dark">
                Order ID: {data.order_number ?? "N/A"}&nbsp;
              </p>
              <span className="badge_warning">
                {data?.payment_status ?? "N/A"}
              </span>
              <span
                className={
                  data?.order_type === "service"
                    ? "badge_default"
                    : "badge_payment"
                }
              >
                {data?.order_type ?? "N/A"}
              </span>
            </div>

            <Link to="/order">
              <button className="btn btn-light btn-sm">Back</button>
            </Link>
          </div>

          <div className="row">
            {/* Left Column: Order Item & Order Summary */}
            <div className="col-md-8">
              {/* Order Item */}
              <div className="card mb-4">
                <div className="card-header m-0 p-2 d-flex gap-2 align-items-center">
                  <p className="mb-0">Order Item</p>
                  <span className="badge_danger">{data.status ?? "N/A"}</span>
                  <span className="badge_payment">
                    {data.items?.length > 0 &&
                      data.items[0]?.product?.coupon_code && (
                        <span>{data?.items[0]?.product?.coupon_code}</span>
                      )}
                  </span>
                </div>
                <div className="card-body m-0 p-4">
                  {data.items?.map((item, index) =>
                    item.product ? (
                      <div key={index} className="row align-items-center mb-3">
                        <div className="col-md-3">
                          <img
                            src={
                              item?.product?.image_url1
                                ? `${ImageURL}${item?.product?.image_url1}`
                                : noImage
                            }
                            alt={item?.product?.name}
                            style={{ width: "100%" }}
                          />
                        </div>
                        <div className="col">
                          <p>
                            <b>{item?.product?.category_id}</b>:&nbsp;
                            {item?.product?.name}
                          </p>
                          <p>{item?.product?.description}</p>
                          <p>
                            <del>
                              ₹:
                              {parseFloat(
                                item?.product?.original_price
                              ).toFixed(0)}
                            </del>
                            &nbsp;&nbsp;
                            <span style={{ color: "#dc3545" }}>
                              ₹:
                              {parseFloat(
                                item?.product?.discounted_price
                              ).toFixed(0)}
                            </span>
                            &nbsp;&nbsp;
                            <span className="badge_danger">
                              {parseFloat(
                                item?.product?.discount_percentage
                              ).toFixed(0)}
                              % saved
                            </span>
                          </p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-center my-5 py-5">
                          No Product Data Found !
                        </p>
                      </>
                    )
                  )}

                  <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-9">
                      {data?.order_type === "service" ? (
                        <div className="d-flex gap-4">
                          <p>Service Date: {data?.service_date ?? " "}</p>
                          <p>Service Time: {data?.service_time ?? " "}</p>
                        </div>
                      ) : (
                        <div className="d-flex gap-4">
                          <p>Quantity: {data?.quantity ?? " "}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-header m-0 p-2 d-flex gap-2 align-items-center">
                  <p className="mb-0">Shop Details</p>
                </div>
                <div className="card-body m-0 p-4">
                  {data.shop ? (
                    <div className="row align-items-center mb-3">
                      <div className="col">
                        <div className="row">
                          <div className="col-md-3">
                            <p>Company Name</p>
                          </div>
                          <div className="col-md-9">
                            <p>: {data.shop.legal_name ?? "N/A"}</p>
                          </div>

                          <div className="col-md-3">
                            <p>Company Email</p>
                          </div>
                          <div className="col-md-9">
                            <p>: {data.shop.email ?? "N/A"}</p>
                          </div>

                          <div className="col-md-3">
                            <p>Company Mobile</p>
                          </div>
                          <div className="col-md-9">
                            <p>: {data.shop.mobile ?? "N/A"}</p>
                          </div>

                          <div className="col-md-3">
                            <p>Description</p>
                          </div>
                          <div className="col-md-9">
                            <p>: {data.shop.description ?? "N/A"}</p>
                          </div>

                          <div className="col-md-3">
                            <p>Address</p>
                          </div>
                          <div className="col-md-9">
                            <p>: {data.shop.street ?? "N/A"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p>No Shop Details Available</p>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="card">
                <div className="card-header m-0 p-2 d-flex justify-content-between align-items-center">
                  <p className="mb-0">Order Summary</p>
                  <p>
                    <span
                      className={
                        (data.payment_type?.replace(/_/g, " ") ?? "Pending") ===
                        "online payment"
                          ? "badge_default"
                          : "badge_payment"
                      }
                    >
                      {data.payment_type?.replace(/_/g, " ") ?? "Pending"}
                    </span>
                    &nbsp;
                    <span className="badge_warning">
                      {data.payment_status ?? "Pending"}
                    </span>
                  </p>
                </div>
                <div className="card-body  m-0 p-4">
                  <div className="d-flex justify-content-between">
                    <span>Unit Price</span>
                    <span>
                      {data.items?.length > 0 && data.items[0]?.unit_price && (
                        <span className="coupon_code">
                          ₹ {parseFloat(data?.items[0]?.unit_price).toFixed(2)}
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>Subtotal</span>
                    <span>₹ {parseFloat(data.total).toFixed(2)}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between pb-3">
                    <span>Total </span>
                    <span>₹ {parseFloat(data.total).toFixed(2)}</span>
                  </div>
                  {/* <div className="d-flex align-items-center gap-1">
                    <button className="badge_outline_dark">Send Invoice</button>
                    <button className="badge_outline_pink">
                      Collect Payment
                    </button>
                  </div> */}
                </div>
              </div>
            </div>

            {/* Right Column: Notes, Customer Info, Contact, and Address */}
            <div className="col-md-4">
              {/* Notes */}
              <div className="card mb-2">
                <div className="card-header m-0 p-2">
                  <p className="mb-0">Notes</p>
                </div>
                <div className="card-body  m-0 p-4">
                  <p>{data.notes ?? "No notes available"}</p>
                </div>
              </div>

              {/* Customers */}
              <div className="card mb-2">
                <div className="card-header m-0 p-2">
                  <p className="mb-0">Customer</p>
                </div>
                <div className="card-body  m-0 p-4">
                  <p>
                    Name :&nbsp;
                    {`${data.first_name}${
                      data.last_name ? ` ${data.last_name}` : ""
                    }`}
                  </p>
                  <p>Email : {data.email ?? "No Email provided"}</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="card mb-2">
                <div className="card-header m-0 p-2">
                  <p className="mb-0">Contact Information</p>
                </div>
                <div className="card-body  m-0 p-4">
                  <p>Name : {data?.customer?.name ?? "N/A"}</p>
                  <p>Email : {data?.customer?.email ?? "N/A"}</p>
                  <p>Phone : {data?.mobile ?? "No phone number provided"}</p>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="card mb-2">
                <div className="card-header m-0 p-2">
                  <p className="mb-0">Address</p>
                </div>
                <div className="card-body  m-0 p-4">
                  <p>{data.delivery_address ?? "No address found"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default OrderView;
