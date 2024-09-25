import React, { useState, useEffect } from "react";
import Category1 from "../../../assets/category1.png";
import Category2 from "../../../assets/category2.png";
import Category3 from "../../../assets/category3.png";
import Category4 from "../../../assets/category4.png";
import Category5 from "../../../assets/category5.png";
import Category6 from "../../../assets/category6.png";
import Category7 from "../../../assets/category7.png";
import Category8 from "../../../assets/category8.png";
import Category9 from "../../../assets/category9.png";
import Category10 from "../../../assets/category10.png";
import Category11 from "../../../assets/category11.png";
import Category12 from "../../../assets/category12.png";
import Category13 from "../../../assets/category13.png";
import Category14 from "../../../assets/category14.png";
import Category15 from "../../../assets/category15.png";
import Category16 from "../../../assets/category16.png";
import Category17 from "../../../assets/category17.png";
import { BiSolidCategory } from "react-icons/bi";

const categories = [
  { id: 1, img: Category1, title: "Fashions" },
  { id: 2, img: Category2, title: "Cosmetics" },
  { id: 3, img: Category3, title: "Wedding" },
  { id: 4, img: Category4, title: "Beauty Spa" },
  { id: 5, img: Category5, title: "Electronics" },
  { id: 6, img: Category6, title: "Furnitures" },
  { id: 7, img: Category7, title: "Gym" },
  { id: 8, img: Category8, title: "Logistics" },
  { id: 9, img: Category9, title: "Gadgets" },
  { id: 10, img: Category10, title: "Grocery" },
  { id: 11, img: Category11, title: "Health Care" },
  { id: 12, img: Category12, title: "Books" },
  { id: 13, img: Category13, title: "Appliances" },
  { id: 14, img: Category14, title: "Mobiles" },
  { id: 15, img: Category15, title: "Toys" },
  { id: 16, img: Category16, title: "Baby Care" },
  { id: 17, img: Category17, title: "Stationery" },
];

function Categories() {
  const [visibleCategories, setVisibleCategories] = useState(11);

  useEffect(() => {
    const updateVisibleCategories = () => {
      const width = window.innerWidth;
      if (width >= 1200) {
        setVisibleCategories(11); // XL screens
      } else if (width >= 992) {
        setVisibleCategories(10); // LG screens
      } else if (width >= 768) {
        setVisibleCategories(5); // MD screens
      } else {
        setVisibleCategories(3); // SM screens
      }
    };

    updateVisibleCategories();
    window.addEventListener("resize", updateVisibleCategories);

    return () => window.removeEventListener("resize", updateVisibleCategories);
  }, []);

  const handleAllCategoriesClick = () => {
    const offcanvasElement = document.getElementById("offcanvasCategories");
    const bsOffcanvas = new window.bootstrap.Offcanvas(offcanvasElement);
    bsOffcanvas.show();
  };

  const handleOffcanvasClose = () => {
    const offcanvasElement = document.getElementById("offcanvasCategories");
    const bsOffcanvas =
      window.bootstrap.Offcanvas.getInstance(offcanvasElement);
    if (bsOffcanvas) {
      bsOffcanvas.hide();
    }
  };

  return (
    <section>
      <div className="container-fluid my-4">
        <div className="row d-flex justify-content-center mt-4">
          {categories.slice(0, visibleCategories).map((category) => (
            <div
              className="col-lg-1 col-md-2 col-3 text-center"
              key={category.id}
            >
              <div className="card categoryCard">
                <img
                  src={category.img}
                  alt={category.title}
                  className="img-fluid p-2"
                />
              </div>
              <h6 className="mt-2">{category.title}</h6>
            </div>
          ))}
          <div className="col-lg-1 col-md-2 col-3 text-center">
            <div
              className="card categoryCard"
              onClick={handleAllCategoriesClick}
            >
              <BiSolidCategory className="img-fluid p-2" size={55} />
            </div>
            <h6 className="mt-2">All Categories</h6>
          </div>
        </div>
      </div>

      {/* Offcanvas Component */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasCategories"
        aria-labelledby="offcanvasCategoriesLabel"
      >
        <div className="offcanvas-header">
          <h4 className="offcanvas-title fw-bold" id="offcanvasCategoriesLabel">
            All Categories
          </h4>
          <button
            type="button"
            className="btn-close text-reset"
            onClick={handleOffcanvasClose}
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="row">
            {categories.map((category) => (
              <div
                className="col-lg-3 col-md-4 col-6 text-center mb-4"
                key={category.id}
              >
                <div className="card categoryOffCard">
                  <img
                    src={category.img}
                    alt={category.title}
                    className="img-fluid p-2"
                  />
                </div>
                <h6 className="mt-2">{category.title}</h6>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;
