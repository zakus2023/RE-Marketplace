import React, { useRef } from "react";
import logo from "../assets/logo.png";
import { FaSearch } from "react-icons/fa";
import "../styles/Navbar.css";
import profile_pic from '../assets/p1_product_i1.png'
import nav_dropdown_icon from '../assets/nav_dropdown.png'
import { Link } from "react-router-dom";

export default function Navbar() {
  const menuRef=useRef()
  const handleDropdown = (e)=>{
    menuRef.current.classList.toggle("nav-menu-visible")
    e.target.classList.toggle("open")
  }


  return (
    <body>
      <nav>
        <div className="nav-left">
        <Link to='/'><img src={logo} alt="" className="logo" /></Link>
        <div className="search-box">
          <FaSearch className="fa"/>
          <input type="text" placeholder="Search" />
        </div>
        </div>

        <div className="nav-right">
          <div className="menu">
            <img src={nav_dropdown_icon} alt="" className="nav-dropdown" onClick={handleDropdown}/>
            <ul ref={menuRef} className="nav-menu">
              <Link to='/'><li className="active">Home</li></Link>
              <Link to='/about'><li>About</li></Link>
              <Link to='/contactus'><li>Contact Us</li></Link>
              <Link to='/signin'><li>Signin</li></Link>
            </ul>
          </div>
          <div className="user-profile">
            <img src={profile_pic} alt="" />
          </div>
        </div>
      </nav>
    </body>
  );
}
