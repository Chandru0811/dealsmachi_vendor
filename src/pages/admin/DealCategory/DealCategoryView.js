import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import cat1 from "../../../assets/category5.png";
import api from "../../../config/URL";
import toast from "react-hot-toast";
import ImageURL from "../../../config/ImageURL";
import { Modal } from "react-bootstrap";

function DealCategoryView() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState([]);
  const navigate = useNavigate();
  // const [shopStatus, setShopStatus] = useState("");
  // const [loading, setLoading] = useState(false);

  // const [showModal, setShowModal] = useState(false);
  // const handleOpenModal = () => setShowModal(true);
  // const handleClose = () => setShowModal(false);

  console.log("first", data.icon);

  const getData = async () => {
    if (id) {
      setLoading(true);
      try {
        const response = await api.get(`admin/dealCategory/${id}`);
        setData(response.data.data);
      } catch (error) {
        toast.error("Error Fetching Data ", error);
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, [id]);
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const response = await api.get(`admin/categoryGroup/${id}`);
  //       formik.setValues(response.data.data);
  //     } catch (error) {
  //       toast.error("Error Fetching Data", error.message);
  //     }
  //   };
  //   getData();
  // }, [id]);
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
        <div className="container-fluid minHeight">
          <div className="card shadow border-0 mb-2 top-header">
            <div className="container-fluid py-4">
              <div className="row align-items-center">
                <div className="row align-items-center">
                  <div className="col">
                    <div className="d-flex align-items-center gap-4">
                      <h1 className="h4 ls-tight headingColor">
                        View Deal Category
                      </h1>
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="hstack gap-2 justify-content-start">
                      <Link to="/dealcategories">
                        <button type="button" className="btn btn-sm btn-light">
                          Back
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="card shadow border-0 my-2"
            style={{ minHeight: "80vh" }}
          >
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
                                        <p className="text-muted text-sm">:  {data.active == 0 ? 'Active' : data.active == 1 ? 'Inactive' : ''}</p>
                                    </div>
                                </div>
                            </div> */}
                <div className="col-md-6 col-12">
                  <div className="row mb-3">
                    <div className="col-6 d-flex justify-content-start align-items-center">
                      <p className="text-sm">
                        <b>Description</b>
                      </p>
                    </div>
                    <div className="col-6">
                      <p className="text-muted text-sm">: {data.description}</p>
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
                      <p className="text-muted text-sm">
                        :{" "}
                        <img
                          src={`${ImageURL}${data.image_path}`}
                          alt="icon"
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default DealCategoryView;
