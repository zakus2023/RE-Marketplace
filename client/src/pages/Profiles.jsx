import React, { useEffect, useState } from "react";
import "../styles/Profiles.css";
import pimage from "../assets/profile_pic.webp";
import { useRef } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function Profiles() {
  const fileRef = useRef();
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
        console.log(formData)
      }
    );
  };

  return (
    <div className="profiles">
      <div className="profile-container">
        <h1>Your Profile</h1>
        <form>
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="images/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="profile-image">
            <img
              src={formData.avatar || currentUser.avatar}
              alt=""
              onClick={() => fileRef.current.click()}
            />
          </div>
          <div className="profile-fields">
            <input type="text" placeholder="Your name" id="username" />
            <input type="email" placeholder="Your Email" id="email" />
            <input type="password" placeholder="Password" id="password" />
          </div>
          <button>Update</button>
        </form>
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
