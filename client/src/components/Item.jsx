import React, { useEffect, useState } from "react";
import "../styles/Item.css";
import houses from "../assets/houses.png";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Item({ listing }) {
  console.log(listing);
  const [strikethrough, setStrikethrough] = useState("");
  console.log(strikethrough)

  useEffect(()=>{
    if(listing.offer){
      setStrikethrough("strike")
    }
  },[])

  return (
    <div className="items">
      <div>
        <Link to={`/listing/${listing._id}`} className="item-row">
          <div className="item-col">
            <img
              src={
                listing.imageUrls[0] ||
                "data:image/png;base64,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"
              }
              alt=""
            />
            <p className="listing-name">{listing.name}</p>
            <div className="item-price">
              <div className="regular-price">
                <p className={strikethrough}>${listing.regularPrice.toLocaleString("en-US")}</p>
              </div>
              {listing.offer && (
                <div className="discount-price">
                  <p>${listing.discountPrice.toLocaleString("en-US")}</p>
                </div>
              )}
            </div>
            <div className="city">
            <FaMapMarkerAlt className="city-fa"/>
            <p className="city">{listing.city}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
