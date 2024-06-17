import React, { useEffect, useState } from "react";
import "../styles/Listing.css";
import main_img from "../assets/houses.png";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaBed,
  FaParking,
  FaBath,
  FaMapMarkedAlt,
  FaChair,
} from "react-icons/fa";
import Contact from "../components/Contact";

export default function Listing() {
  const params = useParams();
  const [fetchedData, setFetchedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [selectedImage, setSelecetedImage] = useState(null);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const listingId = params.id;
    const fetchedListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/get/${listingId}`);
        const data = await res.json();
        if (data.success == false) {
          setLoading(false);
          setError(data.message);
          return;
        }
        setFetchedData(data);
        setSelecetedImage(data.imageUrls);

        setLoading(false);
        setError(false);
      } catch (error) {
        setLoading(false);
        setError(error.message);
      }
    };
    fetchedListing();
  }, [params.id]);

  // useEffect(() => {
  //   const fetchedOwner = async () => {
  //     try {
  //       const res = await fetch(`/api/user/${fetchedData.userRef}`);
  //       const data = await res.json();
  //       if (data.success == false) {
  //         console.log(data.message);
  //         return
  //       }
  //       setListingOwner(data);
  //       console.log(data);
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };
  //   fetchedOwner();
  // }, [fetchedData.userRef]);

  const handleImageClick = (index) => {
    setSelecetedImage(fetchedData.imageUrls[index]);
  };

  return (
    <div className="mainlisting">
      <div className="inner-listing">
        {loading && <p>Loading ...</p>}
        {error && <p>"something went wrong</p>}
        {fetchedData && !loading && !error && (
          <div>
            <h2>{fetchedData.name}</h2>
            <div className="innermost-listing">
              <div className="listingimages">
                <div className="mainimage">
                  <img src={selectedImage} alt="" />
                </div>

                <div className="smallimages">
                  {fetchedData.imageUrls.map((url, index) => (
                    <div key={index} className="smalllimages">
                      <img
                        src={url}
                        alt=""
                        onClick={() => {
                          handleImageClick(index);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="listing-info">
                <div className="price">
                  <div className="cost">
                    <span>$ {""}</span>
                    <span>
                      {fetchedData.offer
                        ? fetchedData.discountPrice.toLocaleString("en-US")
                        : fetchedData.regularPrice.toLocaleString("en-US")}
                    </span>
                    <span>{""}</span>
                    <span>{fetchedData.type === "rent" && "/month"}</span>
                  </div>
                  <div className="discount">
                    {fetchedData.offer && (
                      <span>
                        Discount: $
                        {+fetchedData.regularPrice - +fetchedData.discountPrice}{" "}
                        OFF
                      </span>
                    )}
                  </div>
                </div>

                <div className="address">
                  <p className="addr">{fetchedData.address}</p>
                  <p>{fetchedData.city}</p>
                  <p>{fetchedData.province}</p>
                  <p>{fetchedData.postalCode}</p>
                </div>
                <div className="type">
                  <p>{fetchedData.type === "rent" ? "For Rent" : "For Sale"}</p>
                </div>
                <div className="description">
                  <p>{fetchedData.description}</p>
                </div>

                <div className="facilities">
                  <div className="faci">
                    <FaBed />
                    <span>{fetchedData.bedrooms}</span>
                    <span>Bedrooms</span>
                  </div>
                  <div className="faci">
                    <FaBath />
                    <span>{fetchedData.bathrooms}</span>
                    <span>Bathrooms</span>
                  </div>
                  <div className="faci">
                    {fetchedData.parking && (
                      <p>
                        <FaParking />
                        <span>Parking</span>
                      </p>
                    )}
                  </div>
                  <div className="faci">
                    {fetchedData.furnished && (
                      <p>
                        <FaChair />
                        <span>Furnished</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-text" onClick={() => setContact(true)}>
              {currentUser &&
                fetchedData.userRef !== currentUser._id &&
                !contact && <p>Contact Landlord</p>}
            </div>
            {!currentUser && <p>You must login to contact the Landlord</p>}
            <div className="contact-form">
              {contact && <Contact listing={fetchedData} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
