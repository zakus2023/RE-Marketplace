import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import "../styles/Navbar.css";
import profile_pic from "../assets/p1_product_i1.png";
import nav_dropdown_icon from "../assets/nav_dropdown.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  signoutUserStart,
  signoutUserSuccess,
  signoutUserFailure,
} from "../redux/user/userSlice";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  console.log(searchTerm);

  const handleSearchInputSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/searchListing?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const menuRef = useRef();
  const handleDropdown = (e) => {
    menuRef.current.classList.toggle("nav-menu-visible");
    e.target.classList.toggle("open");
  };

  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      dispatch(signoutUserStart());
      const res = await fetch("/api/signout");
      const data = await res.json();
      if (data.success == false) {
        dispatch(signoutUserFailure(data.message));
        return;
      }
      dispatch(signoutUserSuccess(data));
    } catch (error) {
      dispatch(signoutUserFailure(error.message));
    }
  };

  return (
    <body>
      <nav>
        <div className="nav-left">
          <Link to="/">
            <img src={logo} alt="" className="logo" />
          </Link>
          <form onSubmit={handleSearchInputSubmit}>
            <div className="search-box">
              <button className="search-btn">
                <FaSearch className="fa" />
              </button>
              <input
                type="text"
                placeholder="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
              />
            </div>
          </form>
        </div>

        <div className="nav-right">
          <div className="menu">
            <img
              src={nav_dropdown_icon}
              alt=""
              className="nav-dropdown"
              onClick={handleDropdown}
            />
            <ul ref={menuRef} className="nav-menu">
              <Link to="/">
                <li className="active">Home</li>
              </Link>
              <Link to="/about">
                <li>About</li>
              </Link>
              <Link to="/contactus">
                <li>Contact Us</li>
              </Link>
              {currentUser ? (
                <li onClick={handleSignout}>Logout</li>
              ) : (
                <Link to="/signin">
                  <li className="signin-li">Login</li>
                </Link>
              )}
            </ul>
          </div>
          <Link to="/profiles">
            <div className="user-profile">
              {currentUser && <img src={currentUser.avatar} alt="" />}
            </div>
          </Link>
        </div>
      </nav>
    </body>
  );
}
