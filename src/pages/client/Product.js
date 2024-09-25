import React from 'react';
import { IoIosStar, IoLogoWhatsapp } from "react-icons/io";
import { BsGeoAlt } from "react-icons/bs";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import Filter from "../../assets/Filter.png";
import Image1 from "../../assets/productImg1.png";
import Image2 from "../../assets/productImg2.png";
import Image3 from "../../assets/productImg3.png";
import Image4 from "../../assets/productImg4.png";
import Image5 from "../../assets/productImg5.png";
import Image6 from "../../assets/productImg6.png";
import Tick from "../../assets/tick.png";
import { FaStar } from "react-icons/fa";
import Advertise from "../../assets/advertiseImg.png";
import * as Yup from "yup";
import { useFormik } from 'formik';

const suitShops = [
    {
        id: 1,
        name: "Wear It Once",
        rating: "4.9",
        location: "Parrys, Chennai",
        services: ["Costumes On Rent", "Blazers On Rent"],
        image: Image1,
    },
    {
        id: 2,
        name: "Avaran Fashion",
        rating: "4.9",
        location: "Tnagar, Chennai",
        services: ["Costumes On Rent", "Blazers On Rent"],
        image: Image2,
    },
    {
        id: 3,
        name: "Unique Designers",
        rating: "4.9",
        location: "Parrys, Chennai",
        services: ["Costumes On Rent", "Blazers On Rent"],
        image: Image3,
    },
    {
        id: 4,
        name: "Wow Ethnic",
        rating: "4.9",
        location: "Tnagar, Chennai",
        services: ["Costumes On Rent", "Blazers On Rent"],
        image: Image4,
    },
    {
        id: 5,
        name: "Shripati Collection",
        rating: "4.9",
        location: "Parrys, Chennai",
        services: ["Costumes On Rent", "Blazers On Rent"],
        image: Image5,
    },
    {
        id: 6,
        name: "Urban Styler",
        rating: "4.9",
        location: "Tnagar, Chennai",
        services: ["Costumes On Rent", "Blazers On Rent"],
        image: Image6,
    }
];

function Product() {
    const validationSchema = Yup.object({
        name: Yup.string().required("*Name is required"),
        phone: Yup.string()
            .required("*Mobile number is required")
            .matches(/^[0-9]{8,10}$/, "*Mobile number must be between 8 and 10 digits"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            phone: "",
            email: ""
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            console.log("Form Details:", values);
        },
    });
    return (
        <section className="container">
            <div className='row d-flex justify-content-between align-items-center'>
                <div className='col-12 col-md-7 ms-2'>
                    <h3 className='fw-bold'>Popular Wedding Suits On Rent in Chennai</h3>
                </div>
                <div className='col-12 col-md-4 py-2'>
                    <div className='d-flex justify-content-center justify-content-md-between productbtns flex-wrap'>
                        <div className='mb-2 mb-md-0'>
                            <div className="dropdown">
                                <button className="btn btn-button dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Sort By
                                </button>
                                <ul className="dropdown-menu">
                                    <li><button className="dropdown-item" type="button">Action</button></li>
                                    <li><button className="dropdown-item" type="button">Another action</button></li>
                                </ul>
                            </div>
                        </div>
                        <div className='mb-2 mb-md-0'>
                            <button className='btn btn-button'>
                                Top Rated <IoIosStar />
                            </button>
                        </div>
                        <div>
                            <button className='btn btn-button'>
                                All Filters <img src={Filter} alt="Filter Icon" width={"20px"} height={"20px"} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-8">
                    <div className="row">
                        {suitShops.map((shop) => (
                            <div className="col-md-6 mb-4" key={shop.id}>
                                <div className="card h-100 shadow-sm">
                                    <div className="row g-0 align-items-center">
                                        <div className="col-4">
                                            <img
                                                src={shop.image}
                                                className="img-fluid ms-2"
                                                alt={shop.name}
                                                style={{ objectFit: "cover", height: "100%", width: "100%" }}
                                            />
                                        </div>
                                        <div className="col-8">
                                            <div className="card-body">
                                                <p className="fw-bold d-flex align-items-centermb-1 mb-2 fs-5">
                                                    {shop.name}
                                                </p>
                                                <FaStar className="text-warning ms-2" style={{fontSize: "18px"}} />
                                                <span className="badge bg-light text-dark border me-2 mb-2">
                                                    <span className="ms-1">{shop.rating}</span>
                                                </span>
                                                <img src={Tick} width={"20px"} alt="Verified" />
                                                <span className="ms-1 fw-bold">Verified</span>
                                                <p className="card-text text-muted mb-2">
                                                    <BsGeoAlt className="me-1" style={{fontSize: "18px"}}/>
                                                    {shop.location}
                                                </p>
                                                <div className="row d-flex justify-content-center mb-3">
                                                    {shop.services.map((service, index) => (
                                                        <div key={index} className="col-12 col-sm-6 mb-2">
                                                            <span className="badge bg-light text-dark border text-center">
                                                                {service}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>

                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-around mb-3">
                                            <button className="btn btn-primary d-flex align-items-center">
                                                <FaPhoneAlt className="me-1" /> Show Number
                                            </button>
                                            <button className="btn btn-danger d-flex align-items-center">
                                                Send Enquiry
                                            </button>
                                            <button className="btn btn-success d-flex align-items-center">
                                                <IoLogoWhatsapp className="me-1" /> Chat
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="col-lg-4">
                    <div className="sticky-add">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">Get the list of best <strong className="text-danger">Wedding Suits On Rent</strong></h5>
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder='Name*'
                                            className={`form-control  ${formik.touched.name && formik.errors.name
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            {...formik.getFieldProps("name")}
                                        />
                                        {formik.touched.name &&
                                            formik.errors.name && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.name}
                                                </div>
                                            )}
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            name="phone"
                                            placeholder='Mobile Number*'
                                            className={`form-control  ${formik.touched.phone && formik.errors.phone
                                                ? "is-invalid"
                                                : ""
                                                }`}
                                            {...formik.getFieldProps("phone")}
                                        />
                                        {formik.touched.phone &&
                                            formik.errors.phone && (
                                                <div className="invalid-feedback">
                                                    {formik.errors.phone}
                                                </div>
                                            )}
                                    </div>
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            name="email"
                                            placeholder='Email Id(is Optional)'
                                            className={`form-control`}
                                            {...formik.getFieldProps("email")}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-danger w-100">Send Enquiry</button>
                                </form>
                            </div>
                        </div>
                        <div className="card">
                            <img src={Advertise} className="card-img-top" alt="Ad" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Product;
