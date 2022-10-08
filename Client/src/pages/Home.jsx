import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
// import Product from "../components/Products";
import Slider from "../components/Slider";
// import Product from "./ProductList";

const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      {/* <Product/> */}
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;
