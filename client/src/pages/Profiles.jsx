import React from "react";
import "../styles/Profiles.css";
import pimage from '../assets/profile_pic.webp'

export default function Profiles() {
  return (
    <div className="profiles">
      <div className="profile-container">
        <h1>Your Profile</h1>
        <div className="profile-image">
        <img src={pimage} alt="" />
        </div>
        <div className="profile-fields">
          <input type="text" placeholder="Your name" id="username" />
          <input type="email" placeholder="Your Email" id="email" />
          <input type="password" placeholder="Password" id="password" />
        </div>
        <button>Update</button>
        <button className="create">Create Listing</button>
        <div className="delete-signout">
            <p>Delete Account</p>
            <p>Sign out</p>
        </div>
        <div className="show-listing">
        <p>Show Listings</p>
        </div>
      </div>
    </div>
  );
}
