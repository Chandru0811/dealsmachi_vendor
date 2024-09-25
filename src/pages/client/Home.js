import React from "react";
import Hero from "./home/Hero";
import DailyDeals from "./home/DailyDeals";
import BestSelling from "./home/BestSelling";
import Categories from "./home/Categories";
import SubCategories from "./home/SubCategories";
import SubBanner from "./home/SubBanner";

function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <DailyDeals />
      <SubCategories />
      <SubBanner />
      <BestSelling />
    </div>
  );
}

export default Home;
