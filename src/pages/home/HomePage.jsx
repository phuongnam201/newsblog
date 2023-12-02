import React from "react";
import MainLayout from "../../components/MainLayout";
import Hero from "./container/Hero";
import Articles from "./container/Articles";
import CTA from "./container/CTA";
import HomeTest from "./container/HomeTest";

const HomePage = () => {
  return (
    <MainLayout>
      <Hero />
      <Articles />
      {/* <HomeTest /> */}
      <CTA />
    </MainLayout>
  );
};

export default HomePage;
