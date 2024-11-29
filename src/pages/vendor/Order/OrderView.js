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

  const getData = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/vendor/order/${id}`);
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
              &nbsp;
              <span
                className={`badge text-capitalize ${data?.payment_status === "1"
                  ? "badge_warning"
                  : "badge_warning"
                  }`}
              >
                {data?.payment_status === "1"
                  ? "Unpaid"
                  : data?.payment_status === "2"
                    ? "Pending"
                    : data?.payment_status === "3"
                      ? "Paid"
                      : data?.payment_status === "4"
                        ? "Refund Initiated"
                        : data?.payment_status === "5"
                          ? "Refunded"
                          : data?.payment_status === "6"
                            ? "Refund Error"
                            : "Unknown Status"}
              </span>
              &nbsp;&nbsp;
              <span
                className={
                  data?.order_type === "service"
                    ? "badge_default text-capitalize"
                    : "badge_payment text-capitalize"
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
                <div className="card-header m-0 p-2 d-flex justify-content-between gap-2 align-items-center">
                  <div>
                    <p className="mb-0">
                      Order Item &nbsp;
                      <span className="badge_danger text-capitalize">
                        {data?.status === "1"
                          ? "Created"
                          : data?.status === "2"
                            ? "Payment Error"
                            : data?.status === "3"
                              ? "Confirmed"
                              : data?.status === "4"
                                ? "Awaiting Delivery"
                                : data?.status === "5"
                                  ? "Delivered"
                                  : data?.status === "6"
                                    ? "Returned"
                                    : data?.status === "7"
                                      ? "Cancelled"
                                      : "Unknown Status"}
                      </span>
                      &nbsp;
                      <span className="badge_payment">
                        {data.items?.length > 0 &&
                          data.items[0]?.coupon_code && (
                            <span>{data?.items[0]?.coupon_code}</span>
                          )}
                      </span>
                    </p>
                  </div>
                  <div>
                    <span>
                      Date :{" "}
                      {data?.created_at
                        ? new Date(data.created_at).toISOString().split("T")[0]
                        : ""}
                    </span>{" "}
                    &nbsp;
                    <span>
                      Time :{" "}
                      <span className="text-uppercase">
                        {" "}
                        {data?.created_at
                          ? new Date(data.created_at).toLocaleString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: true,
                          })
                          : ""}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="card-body m-0 p-4">
                  {data.items?.map((item, index) =>
                    item ? (
                      <div key={index} className="row align-items-center mb-3">
                        <div className="col-md-3">
                          <img
                            src={
                              item?.product?.image_url1
                                ? `${ImageURL}${item?.product?.image_url1}`
                                : noImage
                            }
                            alt={item?.deal_name}
                            style={{ width: "100%" }}
                          />
                        </div>
                        <div className="col">
                          <h3 className="text-muted text-capitalize">
                            {item?.deal_name}
                          </h3>
                          <p>{item?.deal_description}</p>
                          <p>
                            <del>
                              ₹
                              {new Intl.NumberFormat("en-IN", {
                                maximumFractionDigits: 0,
                              }).format(
                                parseFloat(item?.deal_originalprice)
                              )}
                            </del>
                            &nbsp;&nbsp;
                            <span style={{ color: "#dc3545" }}>
                              ₹
                              {new Intl.NumberFormat("en-IN", {
                                maximumFractionDigits: 0,
                              }).format(
                                parseFloat(item?.deal_price)
                              )}
                            </span>
                            &nbsp;&nbsp;
                            <span className="badge_danger">
                              {parseFloat(
                                item?.discount_percentage
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
                          <p>
                            Service Time:{" "}
                            {data?.service_time
                              ? (() => {
                                const [hours, minutes] = data.service_time
                                  .split(":")
                                  .map(Number);
                                const period = hours >= 12 ? "PM" : "AM";
                                const adjustedHours = hours % 12 || 12;
                                return `${adjustedHours}:${minutes
                                  .toString()
                                  .padStart(2, "0")} ${period}`;
                              })()
                              : " "}
                          </p>
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

              {/* <div className="card mb-4">
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
                            <p>: {data.shop.name ?? "N/A"}</p>
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
              </div> */}

              {/* Order Summary */}
              <div className="card">
                <div className="card-header m-0 p-2 d-flex justify-content-between align-items-center">
                  <p className="mb-0">Order Summary</p>
                  <p>
                    <span
                      className={
                        (data.payment_type?.replace(/_/g, " ") ?? "Pending") ===
                          "online payment"
                          ? "badge_default text-capitalize"
                          : "badge_payment text-capitalize"
                      }
                    >
                      {data.payment_type?.replace(/_/g, " ") ?? "Pending"}
                    </span>
                    &nbsp;
                    <span className="badge_warning text-capitalize">
                      {data?.payment_status === "1"
                        ? "Unpaid"
                        : data?.payment_status === "2"
                          ? "Pending"
                          : data?.payment_status === "3"
                            ? "Paid"
                            : data?.payment_status === "4"
                              ? "Refund Initiated"
                              : data?.payment_status === "5"
                                ? "Refunded"
                                : data?.payment_status === "6"
                                  ? "Refund Error"
                                  : "Unknown Status"}
                    </span>
                  </p>
                </div>
                <div className="card-body  m-0 p-4">
                  <div className="d-flex justify-content-between">
                    <span>
                      Subtotal&nbsp;
                      {data?.quantity !== 1 && (
                        <span style={{ fontSize: "smaller" }}>
                          (x{data.quantity})
                        </span>
                      )}
                    </span>
                    <span>
                      ₹
                      {new Intl.NumberFormat("en-IN", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      }).format(
                        parseFloat(
                          data?.items?.[0]?.deal_originalprice || 0
                        ) * parseFloat(data?.quantity || 0)
                      )}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>
                      Discount&nbsp;
                      {data?.quantity !== 1 && (
                        <span style={{ fontSize: "smaller" }}>
                          (x{data.quantity})
                        </span>
                      )}
                    </span>
                    <span>
                      ₹
                      {new Intl.NumberFormat("en-IN", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      }).format(
                        parseFloat(
                          (data?.items?.[0]?.deal_originalprice || 0) -
                          (data?.items?.[0]?.deal_price || 0)
                        ) * parseFloat(data?.quantity || 0)
                      )}
                    </span>
                  </div>

                  <hr />
                  <div className="d-flex justify-content-between pb-3">
                    <span>
                      Total{" "}
                      {data?.quantity !== 1 && (
                        <span style={{ fontSize: "smaller" }}>
                          (x{data.quantity})
                        </span>
                      )}
                    </span>
                    <span>
                      ₹
                      {new Intl.NumberFormat("en-IN", {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2,
                      }).format(parseFloat(data.total))}
                    </span>
                  </div>
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
                  <p>Name : {data?.customer?.name ?? "N/A"}</p>
                  <p>Email : {data?.customer?.email ?? "N/A"}</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="card mb-2">
                <div className="card-header m-0 p-2">
                  <p className="mb-0">Contact Information</p>
                </div>
                <div className="card-body  m-0 p-4">
                  <p>
                    Name : {data.first_name ? `${data.first_name} ${data.last_name || ''}` : "N/A"}
                  </p>
                  <p>Email : {data.email ?? "No Email provided"}</p>
                  <p>Phone : {data?.mobile ?? "No phone number provided"}</p>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="card mb-2">
                <div className="card-header m-0 p-2">
                  <p className="mb-0">Address</p>
                </div>
                <div className="card-body m-0 p-4">
                  {data.delivery_address ? (
                    (() => {
                      try {
                        const deliveryAddress = JSON.parse(
                          data.delivery_address
                        );
                        return (
                          <>
                            <p>
                              {deliveryAddress.street}, {deliveryAddress.city},{" "}
                              {deliveryAddress.state}, {deliveryAddress.country}
                              , {deliveryAddress.zipCode}.
                            </p>
                            <p></p>
                          </>
                        );
                      } catch (error) {
                        console.error("Invalid JSON:", error);
                        return <p>Invalid address format</p>;
                      }
                    })()
                  ) : (
                    <p>No address found</p>
                  )}
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