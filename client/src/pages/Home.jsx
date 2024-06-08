import React from "react";
import "../styles/Home.css";
import Header from "../components/Header";
import Item from "../components/Item";
import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="item-on-home">
        <h2>Latest Offers</h2>
        <Item className="item-inner-home"/>
      </div>
      <div className="item-on-home">
        <h2>Latest Listings for Sale</h2>
        <Item className="item-inner-home"/>
      </div>
      <div className="item-on-home">
        <h2>Latest Listings for Rent</h2>
        <Item className="item-inner-home"/>
      </div>
      
      <div className="testimonial-outer">
        <div className="testimonial-inner">
          <h2>What our users say</h2>
          <Testimonials className="Testimonial"/>
        </div>
      </div>
    </div>
  );
}
