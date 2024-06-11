import React from "react";
import "../styles/Header.css";
import hand_icon from "../assets/hand_icon.png";
import hero_img from "../assets/houses.png";
import hero_icon from "../assets/arrow.png";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <h2>NEW LISTINGS ONLY</h2>
        <div className="header-hand-icon">
          <p>Affordable</p>
          <img src={hand_icon} alt="" />
        </div>
        <p>homes</p>
        <p>for everyone</p>
        <Link to="/searchlisting" className="header-latest-btn">
          <div>Lets get started</div>
          <img src={hero_icon} alt="" />
        </Link>
      </div>
      <div className="header-right">
        <img src={hero_img} alt="" />
      </div>
    </header>
  );
}
