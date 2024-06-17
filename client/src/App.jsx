import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Profiles from "./pages/Profiles";
import CreateListing from "./pages/CreateListing";
import UpdateListing from "./pages/UpdateListing";
import SearchListing from "./pages/SearchListing";
import Listing from "./pages/Listing";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import PrivateRoutes from "./components/PrivateRoutes";

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profiles" element={<Profiles />} />
            <Route path="/create-listing" element={<CreateListing />} />
            <Route path="/updatelisting/:listingId" element={<UpdateListing />} />
          </Route>
          <Route path="/listing/:id" element={<Listing />} />
          <Route path="/searchlisting" element={<SearchListing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}
