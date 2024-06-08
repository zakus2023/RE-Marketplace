import React from "react";
import "../styles/Item.css";
import houses from "../assets/houses.png";

export default function Item() {
  return (
    // <div className='item'>
    //   <img src={houses} alt="" />
    //   <p>New Modern Home</p>
    //   <div className="item-price">
    //     <div className="regular-price">
    //         $300000.00
    //     </div>
    //     <div className="discount-price">
    //         $250000.00
    //     </div>
    //   </div>
    //   <p>Aboabo-Ghana</p>
    // </div>

    <div className="items">
      <div className="items-container">
        <div className="item-row">
          <div className="item-col">
            <img src={houses} alt="" />
            <p>New Modern Home</p>
            <div className="item-price">
              <div className="regular-price">
                <p>$300000.00</p>
              </div>
              <div className="discount-price">
                <p>$200000.00</p>
              </div>
            </div>
            <p>Aboabo Ghana</p>
          </div>
          <div className="item-col">
            <img src={houses} alt="" />
            <p>New Modern Home</p>
            <div className="item-price">
              <div className="regular-price">
                <p>$300000.00</p>
              </div>
              <div className="discount-price">
                <p>$200000.00</p>
              </div>
            </div>
            <p>Aboabo Ghana</p>
          </div>
          <div className="item-col">
            <img src={houses} alt="" />
            <p>New Modern Home</p>
            <div className="item-price">
              <div className="regular-price">
                <p>$300000.00</p>
              </div>
              <div className="discount-price">
                <p>$200000.00</p>
              </div>
            </div>
            <p>Aboabo Ghana</p>
          </div>
          <div className="item-col">
            <img src={houses} alt="" />
            <p>New Modern Home</p>
            <div className="item-price">
              <div className="regular-price">
                <p>$300000.00</p>
              </div>
              <div className="discount-price">
                <p>$200000.00</p>
              </div>
            </div>
            <p>Aboabo Ghana</p>
          </div>
        </div>
      </div>
    </div>
  );
}
