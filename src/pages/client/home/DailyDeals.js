import React, { useState } from "react";
import card1 from "../../../assets/deal_card_image_1.png";
import card2 from "../../../assets/deal_card_image_2.png";
import card3 from "../../../assets/deal_card_image_3.png";
import card4 from "../../../assets/deal_card_image_4.png";
import card5 from "../../../assets/deal_card_image_5.png";
import card6 from "../../../assets/deal_card_image_6.png";
import card7 from "../../../assets/deal_card_image_7.png";
import card8 from "../../../assets/deal_card_image_8.png";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

function DailyDeals() {
  const [datas] = useState({
    dealData: [
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

  return (
    <section>
      <div className="container-fluid mb-4">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="fw-bold">Daily Deals</h4>
            <Link to='/'>
              <div className="d-flex align-items-center">
                <p className="mb-0">View All</p>
                <MdOutlineKeyboardArrowRight />
              </div>
            </Link>
          </div>
          <div className="row px-3 mt-3">
            {datas.dealData.map((deal) => (
              <div
                key={deal.id}
                className="col-md-3 col-6"
                style={{ border: "1px solid #E4E7E9" }}>
                <div className="card h-100 p-4" style={{ border: "none" }}>
                  <div className="h-100">
                    <img
                      src={deal.img}
                      alt={deal.name}
                      className="img-fluid mb-3"
                    />
                  </div>
                  <div className="card-body">
                    <h6 className="text-center">{deal.name}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </div>
    </section>
  );
}

export default DailyDeals;