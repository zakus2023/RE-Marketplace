import React from "react";
import "../styles/Footer.css";
import footer_logo from "../assets/logo.png";
import footer_logo1 from "../assets/logo1.png";
import insta_icon from "../assets/instagram_icon.png";
import pint_icon from "../assets/pintester_icon.png";
import whats_icon from "../assets/whatsapp_icon.png";
import android_icon from "../assets/play-store.png";
import ios_icon from "../assets/app-store.png";

export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="container">
          <div className="row">
            <div className="footer-col-1">
              <h3>Download our App</h3>
              <p>Download our App fro android and ios</p>
              <div className="app-logo">
                <img src={android_icon} alt="" />
                <img src={ios_icon} alt="" />
              </div>
            </div>

            <div className="footer-col-2">
              <img src={footer_logo} alt="" />
              <p>
                Our purpose is to sustainably make the pleasure of homes
                accessible to many.
              </p>
            </div>

            <div className="footer-col-3">
              <h3>Useful links</h3>
              <ul>
                <li>About</li>
                <li>Contact Us</li>
                <li>Our Offices</li>
                <li>Blog</li>
              </ul>
            </div>
            <div className="footer-col-4">
              <div className="footer-social-inner">
                <h3>Follow us on:</h3>
               <div className="social">
               <div className="social-icons">
                  <img src={insta_icon} alt="" />
                </div>
                <div className="social-icons">
                  <img src={pint_icon} alt="" />
                </div>
                <div className="social-icons">
                  <img src={whats_icon} alt="" />
                </div>
               </div>
              </div>
            </div>
          </div>
          <hr />
          <p className="copyright">
            Copyright 2024 - Abdul-Razak Issah - All rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}
