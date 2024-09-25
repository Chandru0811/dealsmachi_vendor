import React, { useState } from "react";
import { Link } from "react-router-dom";
import Image from "../../../assets/tv.png";

function BannerView() {

  return (
    <section className="px-4">
      <div className="card shadow border-0 mb-3">
        <div className="row p-3">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="h4 ls-tight">View Banner</h1>
            <div>
              <Link to="/banner">
                <button type="button" className="btn btn-light btn-sm">
                  <span>Back</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container card shadow border-0"
        style={{ minHeight: "80vh" }}
      >
        <div className="row mt-5 p-3">
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>Title</b>
                </p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: title</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>Order</b>
                </p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: 2</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>Link</b>
                </p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: Link</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>Link Label</b>
                </p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: Link Label</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>Color</b>
                </p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: #000000</p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-12 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>Image</b>
                </p>
              </div>
              <div className="col-12 mt-3">
                <p>
                  <img
                    src={Image}
                    alt="image"
                    className="img-fluid"
                    width={150}
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-12 d-flex justify-content-start align-items-center">
                <p className="text-sm">
                  <b>Description</b>
                </p>
              </div>
              <div className="col-12 mt-1">
                <p className="text-muted text-sm">Combines style and performance for everyday computing.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BannerView;