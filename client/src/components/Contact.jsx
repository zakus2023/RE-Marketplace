import { useEffect, useState } from "react";
import "../styles/Contact.css";
import { Link } from "react-router-dom";

export default function Contact({ listing }) {
  const [listingOwner, setListingOwner] = useState({});
  const [message, setMessage] = useState("");
  console.log(listing);
  console.log(listingOwner);

  useEffect(() => {
    const fetchedOwner = async () => {
      try {
        const res = await fetch(`/api/user/${listing.userRef}`);
        const data = await res.json();
        setListingOwner(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchedOwner();
  }, [listing.userRef]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      <p>
        {listingOwner && (
          <div className="contact">
            <p className="owners-name">
              Contact <span>{listingOwner.username} </span>for{" "}
              <span>{listing.name}</span>
            </p>
            <textarea
              name="message"
              id="message"
              rows="5"
              value={message}
              onChange={handleChange}
              className="message-textarea"
            ></textarea>
            <Link
              to={`mailto:${listingOwner.email}?subject=Regarding ${listing.name}&body=${message}`}
            className="send-message-link">
              Send message
            </Link>
          </div>
        )}
      </p>
    </>
  );
}
