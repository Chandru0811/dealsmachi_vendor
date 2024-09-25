import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import carouselImg1 from "../../../assets/Hero Section 1.jpg";
import carouselImg2 from "../../../assets/Hero Section 2.jpg";
import carouselImg3 from "../../../assets/Hero Section 3.jpg";
import carouselImg4 from "../../../assets/Hero Section 4.jpg";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const carouselImages = [
  {
    id: 1,
    image: carouselImg1,
  },
  {
    id: 2,
    image: carouselImg2,
  },
  {
    id: 3,
    image: carouselImg3,
  },
  {
    id: 4,
    image: carouselImg4,
  },
];

function Hero() {
  return (
    <div className="mt-4">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={false}
        showDots={true}
        containerClass="custom-carousel"
        dotListClass="custom-dots"
      >
        {carouselImages.map((image) => (
          <div
            key={image.id}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <img
              src={image.image}
              alt={`Carousel Image ${image.id}`}
              className="img-fluid object-contain max-w-full max-h-full px-4"
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Hero;
