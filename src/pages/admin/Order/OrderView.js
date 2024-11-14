import React, { useState } from "react";
import { Link } from "react-router-dom";
import noImage from "../../../assets/noimage.png";

const orderData = {
  order_id: "334902445",
  order_date: "January 8, 2024 at 9:48 pm",
  status: "Pending",
  payment_status: "Pending",
  items: [
    {
      name: "Macbook Air",
      category: "Laptop",
      variant: "Medium",
      color: "Black",
      quantity: 3,
      price: 500.0,
      total: 1500.0,
      image: noImage,
    },
  ],
  subtotal: 1500,
  discount: 100,
  shipping: 0,
  total: 1499,
  customer: {
    name: "Alex Jander",
    email: "alexjander@gmail.com",
    orders: 1,
    tax_exempt: true,
  },
  shipping_address: {
    name: "Alex Jander",
    address: "1226 University Drive",
    city: "Menlo Park",
    state: "CA",
    zip: "94025",
    country: "United States",
    phone: "+16282679041",
  },
  notes: "First customer and order!",
};

function OrderView() {
  const [data] = useState(orderData);

  return (
    <section className="px-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>
          Order ID: {data.order_id}{" "}
          <span className="badge bg-warning text-dark">Payment pending</span>
        </h3>
        <Link to="/order">
          <button className="btn btn-light btn-sm">Back</button>
        </Link>
      </div>

      <div className="row">
        {/* Left Column: Order Item & Order Summary */}
        <div className="col-md-8">
          {/* Order Item */}
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Order Item</h5>
              <span className="badge bg-danger">{data.status}</span>
            </div>
            <div className="card-body">
              {data.items.map((item, index) => (
                <div key={index} className="row align-items-center mb-3">
                  <div className="col-md-2">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "100%" }}
                    />
                  </div>
                  <div className="col">
                    <h6>
                      {item.category}: {item.name}
                    </h6>
                    <p>
                      {item.variant}, {item.color}
                    </p>
                    <p>
                      {item.quantity} x ${item.price.toFixed(2)} = $
                      {item.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              <button className="btn btn-primary btn-sm me-2">
                Fulfill item
              </button>
              <button className="btn btn-secondary btn-sm">
                Create shipping label
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Order Summary</h5>
              <span className="badge bg-warning text-dark">
                Payment pending
              </span>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>${data.subtotal.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Discount</span>
                <span>- ${data.discount.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Shipping</span>
                <span>${data.shipping.toFixed(2)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>Total</strong>
                <strong>${data.total.toFixed(2)}</strong>
              </div>
              <button className="btn send_outline btn-sm me-2 mt-2">
                Send Invoice
              </button>
              <button className="btn btn-primary btn-sm mt-2">
                Collect Payment
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Notes, Customer Info, Contact, and Address */}
        <div className="col-md-4">
          {/* Notes */}
          <div className="card mb-4">
            <div className="card-header">
              <h6 className="mb-0">Notes</h6>
            </div>
            <div className="card-body">
              <p>{data.notes}</p>
            </div>
          </div>

          {/* Customers */}
          <div className="card mb-4">
            <div className="card-header">
              <h6 className="mb-0">Customers</h6>
            </div>
            <div className="card-body">
              <p>{data.customer.name}</p>
              <p>{data.customer.orders} Order</p>
              <p>
                {data.customer.tax_exempt
                  ? "Customer is tax-exempt"
                  : "Not tax-exempt"}
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="card mb-4">
            <div className="card-header">
              <h6 className="mb-0">Contact Information</h6>
            </div>
            <div className="card-body">
              <p>Email: {data.customer.email}</p>
              <p>No phone number provided</p>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="card mb-4">
            <div className="card-header">
              <h6 className="mb-0">Shipping Address</h6>
            </div>
            <div className="card-body">
              <p>{data.shipping_address.name}</p>
              <p>{data.shipping_address.address}</p>
              <p>
                {data.shipping_address.city}, {data.shipping_address.state}{" "}
                {data.shipping_address.zip}
              </p>
              <p>{data.shipping_address.country}</p>
              <p>Phone: {data.shipping_address.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OrderView;
