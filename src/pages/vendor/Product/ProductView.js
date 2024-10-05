import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import Image from "../../../assets/tv.png"; // Ensure you have a fallback if the image is not available
import toast from "react-hot-toast";
import api from "../../../config/URL";
import ImageURL from "../../../config/ImageURL";

function ProductView() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`vendor/product/${id}/get`);
        setData(response.data.data); // Ensure the response structure matches
      } catch (error) {
        toast.error("Error Fetching Data");
      }
      setLoading(false);
    };

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
        <>
          <div className="card shadow border-0 mb-3">
            <div className="row p-3">
              <div className="d-flex justify-content-between align-items-center">
                <h1 className="h4 ls-tight">View Deals</h1>
                <div>
                  <Link to="/product">
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
              {/* <div className="col-md-6 col-12">
            <div className="row mb-3">
              <div className="col-6 d-flex justify-content-start align-items-center">
                <p className="text-sm"><b>Category Group</b></p>
              </div>
              <div className="col-6">
                <p className="text-muted text-sm">: {data.category_group}</p>
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
                      : {data?.categoryGroupName}
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
                    <p className="text-muted text-sm">: {data?.categoryName}</p>
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
                    {console.log("Deal Type Value:", data?.deal_type)}{" "}
                    {/* Debugging */}
                    <p className="text-muted text-sm">
                      :{" "}
                      {data?.deal_type === 1 || data?.deal_type === "0"
                        ? "Product"
                        : data?.deal_type === 2 || data?.deal_type === "1"
                        ? "Service"
                        : data?.deal_type === 3 || data?.deal_type === "2"
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
                    <p className="text-muted text-sm">: {data?.brand}</p>
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
                    <p className="text-muted text-sm">: {data?.name}</p>
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
                      : {data?.original_price}
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
                      : {data?.discounted_price}
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
                      : {data?.discount_percentage}
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
                      : {new Date(data?.start_date).toLocaleDateString()}
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
                      : {new Date(data?.end_date).toLocaleDateString()}
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
                    <p className="text-muted text-sm">: {data?.stock}</p>
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
                    <p className="text-muted text-sm">: {data?.sku}</p>
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
                    <p className="text-muted text-sm">: {data?.description}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Image1</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      {" "}
                      :
                      <img
                        src={`${ImageURL}${data?.image_url1}`}
                        alt="product"
                        className="img-fluid"
                        // width={150}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Image2</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      {" "}
                      :
                      <img
                        src={`${ImageURL}${data?.image_url2}`}
                        alt="product"
                        className="img-fluid"
                        // width={150}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Image3</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      {" "}
                      :
                      <img
                        src={`${ImageURL}${data?.image_url3}`}
                        alt="product"
                        className="img-fluid"
                        // width={150}
                      />
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-12">
                <div className="row mb-3">
                  <div className="col-6 d-flex justify-content-start align-items-center">
                    <p className="text-sm">
                      <b>Image4</b>
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="text-muted text-sm">
                      {" "}
                      :
                      <img
                        src={`${ImageURL}${data?.image_url4}`}
                        alt="product"
                        className="img-fluid"
                        // width={150}
                      />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default ProductView;
