import React from "react";
import Wishlist from "../../assets/No_Wishlist_image.jpg";

function NoWishlist() {
  return (
    <section className="p-5">
      <div className="d-flex align-items-center justify-content-center">
        <img src={Wishlist} alt="img" className="img-fluid" style={{ height: "25rem" }}></img>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h4 className="">YOUR WISHLIST IS EMPTY!</h4>
        <p className="fonts-colo">Start adding items to see them here!</p>
        <div>
          <button type="button" className="btn common-button">START SHOPPING</button>
        </div>
      </div>
    </section>
  );
}

export default NoWishlist;
