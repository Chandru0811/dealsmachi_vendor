import React, { useState } from "react";
import { MdOutlineStarPurple500 } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { MdOutlineLocationOn } from "react-icons/md";
import { MdLocalPhone } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";
import { GoMail } from "react-icons/go";
import { Link } from "react-router-dom";
import image from "../../assets/deal_card_image_1.png";
import photo_1 from "../../assets/deal_card_image_2.png";
import photo_2 from "../../assets/deal_card_image_3.png";
import photo_3 from "../../assets/deal_card_image_4.png";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { BsBarChartLine } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";

function ProductView() {
  const [showNumber, setShowNumber] = useState(false);
  const [showAll, setShowALL] = useState(false);

  const handleShowNumber = () => {
    setShowNumber(true);
  };

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const toggleView = () => {
    setShowALL((prev) => !prev);
  };

  const [datas, setDatas] = useState({
    dealData: [
      {
        id: 1,
        productImage: image,
        title: "24k Luxury Salon",
        openTime: "Open until 9:00 pm",
        yearOfBusiness: "6 Years in Business",
        reviewNumber: "602",
        reviewPeople: "peoples",
        peopleRating: "4.5",
        loaction: "No:23 Rajaji St, Anna Nagar, Chennai.",
        recentlyEnquiry: "24 people recently enquired",
        contactNumber: "7903728930",
        contactAddress: "No:112/89 Anna Salai, Thousand light, Chennai-12.",
        Photos: [
          {
            id: 1,
            image: photo_1,
          },
          {
            id: 2,
            image: photo_2,
          },
          {
            id: 3,
            image: photo_3,
          },
        ],
        rating: [
          {
            id: 1,
            profileImage: image,
            reviewName: "Mani",
            starRating: "5",
            reviewDate: "2 days ago",
            reviewDescription:
              "Did my haircut recently and the experience was absolutely amazing. I would especially like to mention hair stylist Milan for his stunning scissors work.",
          },
          {
            id: 2,
            profileImage: image,
            reviewName: "John",
            starRating: "4",
            reviewDate: "3 days ago",
            reviewDescription:
              "Great service, but the waiting time was a bit long.",
          },
          {
            id: 3,
            profileImage: image,
            reviewName: "Sara",
            starRating: "5",
            reviewDate: "5 days ago",
            reviewDescription:
              "Amazing experience! The staff was very friendly.",
          },
          {
            id: 4,
            profileImage: image,
            reviewName: "Anita",
            starRating: "5",
            reviewDate: "1 week ago",
            reviewDescription: "Loved the ambiance and the service.",
          },
          {
            id: 5,
            profileImage: image,
            reviewName: "Anita",
            starRating: "2",
            reviewDate: "1 week ago",
            reviewDescription: "Loved the ambiance and the service.",
          },
          {
            id: 6,
            profileImage: image,
            reviewName: "Anita",
            starRating: "4",
            reviewDate: "1 week ago",
            reviewDescription: "Loved the ambiance and the service.",
          },
          {
            id: 7,
            profileImage: image,
            reviewName: "Anita",
            starRating: "3",
            reviewDate: "1 week ago",
            reviewDescription: "Loved the ambiance and the service.",
          },
        ],
      },
    ],
  });

  return (
    <section>
      <div className="container-fluid mb-5">
        <div className="row p-4">
          {datas.dealData.map((deal) => (
            <div className="row" key={deal.id}>
              <div
                className="col-md-8 col-12 mb-3"
                style={{ height: "fit-content" }}
              >
                <div
                  className="card h-100 p-3 mb-5"
                  style={{ backgroundColor: "#F8F8F8" }}
                >
                  <div className="d-flex justify-content-end">
                    <div className="d-flex justify-content-center align-items-center">
                      Click to Rate
                      <ReactStars
                        count={5}
                        onChange={ratingChanged}
                        size={24}
                        isHalf={false}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#ffd700"
                      />
                      <button className="btn">
                        <FaRegHeart />
                      </button>
                      <button className="btn">
                        <CiShare2 />
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-8 col-12">
                      <h4>{deal.title}</h4>
                      <div className="row">
                        <div className="col-md-6">
                          <p className="d-flex align-items-center ">
                            <span className="badge-status me-2"></span>
                            {deal.openTime}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p className="d-flex align-items-center ">
                            <span className="badge-status me-2"></span>
                            {deal.yearOfBusiness}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-3 d-flex">
                          <h5 className="pe-1">{deal.reviewNumber}</h5>
                          <p>{deal.reviewPeople}</p>
                        </div>
                        <div className="col-md-6">
                          <h5 className="d-flex align-items-center">
                            {deal.peopleRating}
                            <MdOutlineStarPurple500 size={25} color="#fa8232" />
                          </h5>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <p>
                            <MdOutlineLocationOn size={20} />
                            {deal.loaction}
                          </p>
                        </div>
                        <div className="col-md-6">
                          <p>
                            <BsBarChartLine size={20} />
                            {deal.recentlyEnquiry}
                          </p>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-4 col-12 my-1">
                          <button className="btn btn-primary">
                            <MdLocalPhone />
                            &nbsp; Show Number
                          </button>
                        </div>
                        <div className="col-md-4 col-12 my-1">
                          <button className="btn btn-danger">
                            Send Enquiry
                          </button>
                        </div>
                        <div className="col-md-4 col-12 my-1">
                          <button className="btn btn-success">
                            <IoLogoWhatsapp />
                            &nbsp; Show Number
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 col-12 mt-2">
                      <img
                        src={deal.productImage}
                        className="img-fluid"
                        alt="image"
                      ></img>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <Tabs
                    defaultActiveKey="Photos"
                    id="salon-tab-example"
                    className="mb-5 tab">
                    <Tab eventKey="Overview" title="Overview">
                      <div>Tab content for Overview</div>
                    </Tab>
                    <Tab eventKey="Photos" title="Photos">
                      <div className="row">
                        {datas.dealData[0].Photos.map((photo) => (
                          <div className="col-md-4" key={photo.id}>
                            <img
                              src={photo.image}
                              alt={`Photo ${photo.id}`}
                              className="img-fluid"
                            />
                          </div>
                        ))}
                      </div>
                    </Tab>
                    <Tab eventKey="QuickInfo" title="Quick Info">
                      <div>Tab content for Quick Info</div>
                    </Tab>
                    <Tab eventKey="Reviews" title="Reviews">
                      <div className="d-flex flex-column mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <h5 className="me-3">Rating & Reviews</h5>
                          <h4 className="">{datas.dealData[0].peopleRating}</h4>
                          <MdOutlineStarPurple500 color="#fa8232" />
                        </div>
                        <div className="d-flex flex-column mb-2">
                          <h6>{datas.dealData[0].reviewNumber} Ratings</h6>
                          <p>
                            Jd rating index based on 769 ratings across the web
                          </p>
                        </div>
                        <hr />
                        <div className="row">
                          {showAll
                            ? datas.dealData[0].rating.map((deal) => (
                                <div
                                  className="col-md-6 col-12 mb-3"
                                  key={deal.id}
                                >
                                  <div className="card p-3 h-100">
                                    <div className="row">
                                      <div className="col-md-2 col-12">
                                        <img
                                          src={deal.profileImage}
                                          alt="profile_image"
                                          className="img-fluid rounded-circle"
                                        />
                                      </div>
                                      <div className="col-md-10 col-12">
                                        <div className="d-flex justify-content-between align-items-center">
                                          <h5 className="mb-0">
                                            {deal.reviewName}
                                          </h5>
                                          <span className="text-warning">
                                            {"★".repeat(deal.starRating)}{" "}
                                            <span className="text-muted">
                                              {deal.starRating < 5
                                                ? "★".repeat(
                                                    5 - deal.starRating
                                                  )
                                                : ""}
                                            </span>
                                          </span>
                                        </div>
                                        <p className="text-muted mb-1">
                                          {deal.reviewDate}
                                        </p>
                                        <p>{deal.reviewDescription}</p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))
                            : datas.dealData[0].rating
                                .slice(0, 4)
                                .map((deal) => (
                                  <div
                                    className="col-md-6 col-12 mb-3"
                                    key={deal.id}
                                  >
                                    <div className="card p-3 h-100">
                                      <div className="row">
                                        <div className="col-md-2 col-12">
                                          <img
                                            src={deal.profileImage}
                                            alt="profile_image"
                                            className="img-fluid rounded-circle"
                                          />
                                        </div>
                                        <div className="col-md-10 col-12">
                                          <div className="d-flex justify-content-between align-items-center">
                                            <h5 className="mb-0">
                                              {deal.reviewName}
                                            </h5>
                                            <span className="text-warning">
                                              {"★".repeat(deal.starRating)}{" "}
                                              <span className="text-muted">
                                                {deal.starRating < 5
                                                  ? "★".repeat(
                                                      5 - deal.starRating
                                                    )
                                                  : ""}
                                              </span>
                                            </span>
                                          </div>
                                          <p className="text-muted mb-1">
                                            {deal.reviewDate}
                                          </p>
                                          <p>{deal.reviewDescription}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                        </div>
                        {datas.dealData[0].rating.length > 4 && (
                          <div className="text-start">
                            <p className="btn btn-link" onClick={toggleView}>
                              {showAll ? "Read Less" : "Read More"}
                            </p>
                          </div>
                        )}
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
              <div
                className="col-md-4 col-12"
                style={{ height: "fit-content" }}
              >
                <div className="card h-100 p-3 shadow">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-4 col-12">
                        <h5>Contact :</h5>
                      </div>
                      <div className="col-md-8 col-12">
                        <p
                          className="text-start"
                          onClick={handleShowNumber}
                          style={{ cursor: "pointer" }}
                        >
                          {showNumber ? deal.contactNumber : "Show Number"}
                        </p>
                      </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                      <div className="col-md-4 col-12">
                        <h5>Address :</h5>
                      </div>
                      <div className="col-md-8 col-12">
                        <p className="text-start"> {deal.contactAddress}</p>
                      </div>
                    </div>
                    <hr></hr>
                    <div className="d-flex justify-content-between">
                      <div classNamer="d-flex">
                        <p style={{ textDecoration: "none" }}>
                          <MdOutlineLocationOn color="#3A33FF" />
                          &nbsp;
                          <Link to="#">Get Directions</Link>
                        </p>
                      </div>
                      <div classNamer="d-flex">
                        <p style={{ textDecoration: "none" }}>
                          <GoMail color="#3A33FF" />
                          &nbsp;&nbsp;
                          <Link to="#">Send Enquiry By Mail</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductView;
