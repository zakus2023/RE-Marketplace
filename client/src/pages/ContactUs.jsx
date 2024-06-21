import React from "react";
import "../styles/ContactUs.css";
import contact_arrow from "../assets/contact_arror_icon.png";
import contact_image_icon from "../assets/contact_right_img.png";

export default function ContactUs() {
  return (
    <div className="contact-us">
      
        <form action="https://api.web3forms.com/submit" method="POST" className="contact-left">
          <div className="title">
            <h2>Get in touch</h2>
            <hr />
          </div>
          <input type="hidden" name="access_key" value="6a9902ee-3f0d-4256-8c88-31e0359914c6"></input>
          <input
            type="text"
            placeholder="Your name"
            name="name"
            required
            className="contact-input"
          />
          <input
            type="email"
            placeholder="Your email"
            name="email"
            required
            className="contact-input"
          />
          <textarea
            name="message"
            id=""
            placeholder="Your messsage"
            required
            className="contact-input"
          ></textarea>
          <button type="submit" className="contact-us-button">
            Submit <img src={contact_arrow} alt="" />
          </button>
        </form>
      
      <div className="contact-right">
        <img src={contact_image_icon} alt="" />
      </div>
    </div>
  );
}
