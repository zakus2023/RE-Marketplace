import React, { useEffect, useState } from "react";
import "../styles/SearchListing.css";
import { useNavigate } from "react-router-dom";
import Item from "../components/Item";

export default function SearchListing() {
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [showMore, setShowMore] = useState(false);

  const navigate = useNavigate();

  console.log(listing);
  console.log(listing.length);

  const [sideBardata, setSideBardata] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  console.log(sideBardata);

  const handleChange = (e) => {
    if (
      e.target.id == "all" ||
      e.target.id == "rent" ||
      e.target.id == "sale"
    ) {
      setSideBardata({
        ...sideBardata,
        type: e.target.id,
      });
    }
    if (e.target.id == "searchTerm") {
      setSideBardata({
        ...sideBardata,
        [e.target.id]: e.target.value,
      });
    }
    if (
      e.target.id == "parking" ||
      e.target.id == "furnished" ||
      e.target.id == "offer"
    ) {
      setSideBardata({
        ...sideBardata,
        [e.target.id]:
          e.target.checked || e.target.checked == "true" ? true : false,
      });
    }
    if (e.target.id == "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSideBardata({
        ...sideBardata,
        sort,
        order,
      });
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const offerFromUrl = urlParams.get("offer");
    const furnishedFromUrl = urlParams.get("furnished");
    const parkingFromUrl = urlParams.get("parking");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      offerFromUrl ||
      furnishedFromUrl ||
      parkingFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSideBardata({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        offer: offerFromUrl == "true" ? true : false,
        furnished: furnishedFromUrl == "true" ? true : false,
        parking: parkingFromUrl == "true" ? true : false,
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListing = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();

      const res = await fetch(`/api/listings?${searchQuery}`);
      const data = await res.json();
      if (data.length > 7) {
        setShowMore(true);
      }
      setListing(data);
      setLoading(false);
    };
    fetchListing();
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.set("searchTerm", sideBardata.searchTerm);
    urlParams.set("type", sideBardata.type);
    urlParams.set("offer", sideBardata.offer);
    urlParams.set("parking", sideBardata.parking);
    urlParams.set("furnished", sideBardata.furnished);
    urlParams.set("sort", sideBardata.sort);
    urlParams.set("order", sideBardata.order);

    const searchQuery = urlParams.toString();
    navigate(`/searchListing?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const urlParams = new URLSearchParams(location.search);
    const numberOfListings = listing.length;
    const startIndex = numberOfListings;
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listings?${searchQuery}`);
    const data = await res.json();
    if (data.length > 8) {
      setShowMore(true);
    } else {
      setShowMore(false);
    }

    setListing([...listing, ...data]);
  };

  return (
    <div>
      <div className="main-search">
        <div className="search-left">
          <form onSubmit={handleSubmit}>
            <div className="search-term">
              <span>Search Term:</span>
              <input
                type="text"
                placeholder="Search"
                id="searchTerm"
                name="searchterm"
                onChange={handleChange}
                value={sideBardata.searchTerm}
              />
            </div>
            <div className="search-term">
              <span>Province/State:</span>
              <input
                type="text"
                placeholder="Province"
                id="province"
                name="province"
                onChange={handleChange}
              />
            </div>
            <div className="search-term">
              <span>Postal Code:</span>
              <input
                type="text"
                placeholder="Postal Code"
                id="postal-code"
                name="postal-code"
                onChange={handleChange}
              />
            </div>
            <div className="combo">
              <span>Sort:</span>
              <select
                name=""
                id="sort_order"
                onChange={handleChange}
                defaultValue={"created_at_desc"}
              >
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to high</option>
                <option value="createdAt_desc">Latest</option>
                <option value="createdAt_asc">Oldest</option>
              </select>
            </div>
            <div className="checkboxes">
              <span>Type:</span>
              <div>
                <input
                  type="checkbox"
                  id="all"
                  onChange={handleChange}
                  checked={sideBardata.type == "all"}
                />
                <span>Rent & Sale</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="rent"
                  onChange={handleChange}
                  checked={sideBardata.type == "rent"}
                />
                <span>Rent</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="sale"
                  onChange={handleChange}
                  checked={sideBardata.type == "sale"}
                />
                <span>Sell</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="offer"
                  onChange={handleChange}
                  checked={sideBardata.offer}
                />
                <span>Offer</span>
              </div>
            </div>
            <div className="amenities">
              <span>Amenities:</span>
              <div>
                <input
                  type="checkbox"
                  id="parking"
                  onChange={handleChange}
                  checked={sideBardata.parking}
                />
                <span>Parking spot</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="furnished"
                  onChange={handleChange}
                  checked={sideBardata.furnished}
                />
                <span>Furnished</span>
              </div>
            </div>
            <button className="btn-search">Search</button>
          </form>
        </div>
        <div className="search-right">
          <span>Search Results: {listing.length} listings</span>
          <hr />
          <div className="main-results">
            {loading && <p className="loading">Loading ...</p>}
            {!loading && listing.length == 0 && (
              <p className="no-listings">No listing found for this search</p>
            )}
            {!loading && listing && listing.length > 0 && (
              <div className="inner-search">
                {listing.map((listing) => (
                  <Item listing={listing} key={listing._id} />
                ))}
              </div>
            )}
            {showMore && (
              <button onClick={handleShowMore} className="show-more">
                Show More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
