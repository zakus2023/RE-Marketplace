import React from "react";
import "../styles/SearchListing.css";

export default function SearchListing() {
  return (
    <div>
      <div className="main-search">
        <div className="search-left">
          <form action="">
            <div className="search-term">
              <span>Search Term:</span>
              <input
                type="text"
                placeholder="Search"
                id="searchterm"
                name="searchterm"
              />
            </div>
            <div className="search-term">
              <span>Province/State:</span>
              <input
                type="text"
                placeholder="Province"
                id="province"
                name="province"
              />
            </div>
            <div className="search-term">
              <span>Postal Code:</span>
              <input
                type="text"
                placeholder="Postal Code"
                id="postal-code"
                name="postal-code"
              />
            </div>
            <div className="combo">
              <span>Sort:</span>
              <select name="" id="">
                <option value="">Price high to low</option>
                <option value="">Price low to high</option>
                <option value="">Latest</option>
                <option value="">Oldest</option>
              </select>
            </div>
            <div className="checkboxes">
              <span>Type:</span>
              <div>
                <input type="checkbox" id="all" />
                <span>Rent & Sale</span>
              </div>
              <div>
                <input type="checkbox" id="Rent" />
                <span>Rent</span>
              </div>
              <div>
                <input type="checkbox" id="Sale" />
                <span>Sell</span>
              </div>
              <div>
                <input type="checkbox" id="offer" />
                <span>Offer</span>
              </div>
            </div>
            <div className="amenities">
              <span>Amenities:</span>
              <div>
                <input type="checkbox" id="parking" />
                <span>Parking spot</span>
              </div>
              <div>
                <input type="checkbox" id="furnished" />
                <span>Furnished</span>
              </div>
            </div>
          </form>
        </div>
        <div className="search-right">
          <span>Listing Results:</span>
          <hr />
        </div>
      </div>
    </div>
  );
}
