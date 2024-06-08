import React from "react";
import "../styles/CreateListing.css";

export default function CreateListing() {
  return (
    <div className="main-listing">
      <h2>Create Listing</h2>
      <form action="">
        <div className="row">
          <div className="column-left">
            <div className="inputs">
              <input type="text" name="title" placeholder="Title"/>
              <input type="text" name="address" placeholder="Street name and number"/>
              <input type="text" name="city" placeholder="City"/>
              <input type="text" name="province" placeholder="Province"/>
              <input type="text" name="postalcode" placeholder="Postal code"/>
              <textarea name="description" rows={5} id="decription" placeholder="Description"></textarea>
            </div>
            <div className="checks">
              <div>
                <input type="checkbox" name="sale" />
                <span>Sell</span>
              </div>
              <div>
                <input type="checkbox" name="rent" />
                <span>Rent</span>
              </div>
              <div>
                <input type="checkbox" name="parking" />
                <span>Parking spot</span>
              </div>
              <div>
                <input type="checkbox" name="furnished" />
                <span>Furnished</span>
              </div>
              <div>
                <input type="checkbox" name="offer" />
                <span>Offer</span>
              </div>
            </div>
            <div className="numbers">
              <div>
                <input type="number" name="bedrooms" />
                <span>Beds</span>
              </div>
              <div>
                <input type="number" name="bathrooms" />
                <span>Baths</span>
              </div>
            </div>
            <div className="prices">
              <div>
                <input type="number" name="regularPrice" />
                <span>Regular Price</span>
              </div>
              <div>
                <input type="number" name="discountPrice" />
                <span>Discount Price</span>
              </div>
            </div>
          </div>
          <div className="column-right">
            <p>
              <span>Images</span> The first image will be the cover (max 6)
            </p>
            <div className="uploads">
              <div className="images">
                <input type="file" name="images" />
              </div>
              <button>UPLOAD</button>
            </div>
            <button className="create">CREATE LISTING</button>
          </div>
        </div>
      </form>
    </div>
  );
}
