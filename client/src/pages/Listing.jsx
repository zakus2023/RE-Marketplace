import React from "react";
import "../styles/Listing.css";
import main_img from "../assets/houses.png";

export default function Listing() {
  return (
    <div className="mainlisting">
      <div className="inner-listing">
        <h2>Listing Name</h2>
        <div className="innermost-listing">
        <div className="listingimages">
          <div className="mainimage">
            <img src={main_img} alt="" />
          </div>
          <div className="smallimages">
            <img src={main_img} alt="" />
            <img src={main_img} alt="" />
            <img src={main_img} alt="" />
            <img src={main_img} alt="" />
            <img src={main_img} alt="" />
            <img src={main_img} alt="" />
          </div>
        </div>
        <div className="listing-info">
          <span>$50000.00</span>
          
          <p className="addr">126815 Southgate Rd 12, Dundalk ON</p>
          <div className="type">
            <p>For Rent</p>
          </div>
          <div className="description">
            <p>
              A three bedroom house located at the center of Toronto. The
              property is near a bus stop, a daycare, high school, church and
              mosque. It is also located close to the square one mall
            </p>
          </div>

          <div className="facilities">
            <div>4 beds</div>
            <div>4 baths</div>
            <div>Parking spot</div>
            <div>Furnished</div>
          </div>
          <button>Contact Landlord</button>
        </div>
        </div>
      </div>
    </div>
  );
}
