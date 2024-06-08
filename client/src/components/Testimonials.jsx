import React from "react";
import "../styles/Testimonials.css";
import quote_icon from "../assets/quote.png";
import user_img from "../assets/product_15.png";

export default function Testimonials() {
  return (
    <div className="testimonials">
      <div className="small-container">
        <div className="testi-row">
          <div className="testi-col">
            <img src={quote_icon} alt="" className="quo" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non dolor
              rerum laboriosam quos nisi repellendus. Fugit commodi ut harum. Ex
              voluptatem obcaecati magni? Veniam tempore saepe cum, voluptatem
              facere perspiciatis?
            </p>
            <img src={user_img} alt="" />
            <h3>Abdul-Razak Issah</h3>
          </div>
          <div className="testi-col">
            <img src={quote_icon} alt="" className="quo" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non dolor
              rerum laboriosam quos nisi repellendus. Fugit commodi ut harum. Ex
              voluptatem obcaecati magni? Veniam tempore saepe cum, voluptatem
              facere perspiciatis?
            </p>
            <img src={user_img} alt="" />
            <h3>Abdul-Razak Issah</h3>
          </div>
          <div className="testi-col">
            <img src={quote_icon} alt="" className="quo" />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Non dolor
              rerum laboriosam quos nisi repellendus. Fugit commodi ut harum. Ex
              voluptatem obcaecati magni? Veniam tempore saepe cum, voluptatem
              facere perspiciatis?
            </p>
            <img src={user_img} alt="" />
            <h3>Abdul-Razak Issah</h3>
          </div>
         
        </div>
      </div>
    </div>
  );
}
