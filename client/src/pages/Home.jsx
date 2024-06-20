import React, { useEffect, useState } from "react";
import "../styles/Home.css";
import Header from "../components/Header";
import Item from "../components/Item";
import Testimonials from "../components/Testimonials";
import { Link } from "react-router-dom";

export default function Home() {
  const [offer, setOffer] = useState([]);
  const [rent, setRent] = useState([]);
  const [sale, setSale] = useState([]);

  console.log(offer);
  console.log(rent);
  console.log(sale);

  useEffect(() => {
    const fetchListingOffer = async () => {
      try {
        const res = await fetch("/api/listings?offer=true&limit=4");
        const data = await res.json();
        setOffer(data);
        fetchListingRent();
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchListingRent = async () => {
      try {
        const res = await fetch("/api/listings?type=rent&limit=4");
        const data = await res.json();
        setRent(data);
        fetchListingSale();
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchListingSale = async () => {
      try {
        const res = await fetch("/api/listings?type=sale&limit=4");
        const data = await res.json();
        setSale(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchListingOffer();
  }, []);

  return (
    <div className="main-home">
      <Header />
      <div className="items">
        {offer && offer.length > 0 && (
          <div className="item-on-home">
            <h2>Latest Offers</h2>
            <div className="make-row">
              {offer.map((listing) => (
                <Item
                  className="item-inner-home"
                  listing={listing}
                  key={listing._id}
                />
              ))}
            </div>
            <Link to={"/searchListing?offer=true"} className="see-more-link">
              <p>See more offers</p>
            </Link>
          </div>
        )}

        {rent && rent.length > 0 && (
          <div className="item-on-home">
            <h2>Latest Listings for Rent</h2>
            <div className="make-row">
              {rent.map((listing) => (
                <Item
                  className="item-inner-home"
                  listing={listing}
                  key={listing._id}
                />
              ))}
            </div>
            <Link to={"/searchListing?type=rent"} className="see-more-link">
              <p>See more listings for rent</p>
            </Link>
          </div>
        )}
        {sale && sale.length > 0 && (
          <div className="item-on-home">
            <h2>Latest Listings for Sale</h2>
            <div className="make-row">
              {sale.map((listing) => (
                <Item
                  className="item-inner-home"
                  listing={listing}
                  key={listing._id}
                />
              ))}
            </div>
            <Link to={"/searchListing?type=sale"} className="see-more-link">
              <p>See more listings for sale</p>
            </Link>
          </div>
        )}
      </div>

      <div className="testimonial-outer">
        <div className="testimonial-inner">
          <h2>What our users say</h2>
          <Testimonials className="Testimonial" />
        </div>
      </div>
    </div>
  );
}
