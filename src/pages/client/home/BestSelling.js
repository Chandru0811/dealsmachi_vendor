import React, { useState, useRef } from "react";
import card1 from "../../../assets/deal_card_image_1.png";
import card2 from "../../../assets/deal_card_image_2.png";
import card3 from "../../../assets/deal_card_image_3.png";
import card4 from "../../../assets/deal_card_image_4.png";
import card5 from "../../../assets/deal_card_image_5.png";
import card6 from "../../../assets/deal_card_image_6.png";
import card7 from "../../../assets/deal_card_image_7.png";
import card8 from "../../../assets/deal_card_image_8.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

function BestSelling() {
  const [datas] = useState({
    bestData: [
      {
        id: 1,
        img: card1,
        name: "Boat Ultra s45 Speaker",
      },
      {
        id: 2,
        img: card2,
        name: "OnePlus Camera",
      },
      {
        id: 3,
        img: card3,
        name: "Drone max 83",
      },
      {
        id: 4,
        img: card4,
        name: "OnePlus Z2 Bluetooth Speaker",
      },
      {
        id: 5,
        img: card5,
        name: "OnePlus Bluetooth",
      },
      {
        id: 6,
        img: card6,
        name: "Sony Projector",
      },
      {
        id: 7,
        img: card7,
        name: "Sony Projector",
      },
      {
        id: 8,
        img: card8,
        name: "Sony Projector",
      },
    ],
  });

  const { bestData } = datas;
  const carouselRef = useRef(null);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handlePrev = () => {
    carouselRef.current.previous();
  };

  const handleNext = () => {
    carouselRef.current.next();
  };

  return (
    <section>
      <div className="container-fluid mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="fw-bold">Best Sellers</h4>
          <div className="d-flex align-items-center">
            <IoIosArrowDropleftCircle
              size={40}
              className="cursor-pointer"
              onClick={handlePrev}
              style={{
                color: "#FFB74D",
              }}
            />
            <IoIosArrowDroprightCircle
              size={40}
              className="cursor-pointer ms-2"
              onClick={handleNext}
              style={{
                color: "#FFB74D",
              }}
            />
          </div>
        </div>
        <Carousel
          ref={carouselRef}
          responsive={responsive}
          containerClass="carousel-container-rp"
          infinite={true}
          autoPlay={false}
        >
          {bestData.map((deal) => (
            <div key={deal.id} className="p-2 h-100">
              <div
                className="card h-100 d-flex flex-column bestSelling-card"
                style={{
                  border: "1px solid #E4E7E9",}}>
                <div className="h-100">
                  <img
                    src={deal.img}
                    alt={deal.name}
                    className="img-fluid mb-3 p-4"
                  />
                </div>
                <div className="card-body d-flex flex-column justify-content-between">
                  <h6 className="text-center">{deal.name}</h6>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export default BestSelling;
