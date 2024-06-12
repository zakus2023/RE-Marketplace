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
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice";

export default function Profiles() {
  const fileRef = useRef();
  const [file, setFile] = useState(undefined);
  const [formData, setFormData] = useState({});
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  console.log(formData);

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/deleteUser/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json()
      if(data.success == false){
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  };

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
      }
    );
  };

  return (
    <div className="profiles">
      <div className="profile-container">
        <h1>Your Profile</h1>
        <form onSubmit={handleSubmitUpdate}>
          <input
            type="file"
            ref={fileRef}
            hidden
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="profile-image">
            <img
              src={formData.avatar || currentUser.avatar}
              alt=""
              onClick={() => fileRef.current.click()}
            />
          </div>
          <p className="fileperc">
            {fileUploadError ? (
              <span className="fileperc-error">Error uploading photo</span>
            ) : filePerc > 0 && filePerc < 100 ? (
              <span className="fileperc">{`Uploading ${filePerc}%`}</span>
            ) : filePerc === 100 ? (
              <span className="fileperc-success">Photo upload successful</span>
            ) : (
              ""
            )}
          </p>
          <div className="profile-fields">
            <input
              type="text"
              placeholder="Your name"
              id="username"
              defaultValue={currentUser.username}
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Your Email"
              id="email"
              defaultValue={currentUser.email}
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              id="password"
              defaultValue={currentUser.password}
              onChange={handleChange}
            />
          </div>
          <button>{loading ? "Updating your profile" : "Update"}</button>
          <p>
            {error
              ? error
              : updateSuccess
              ? "Profile updated successfully"
              : ""}
          </p>
        </form>
        <button className="create">Create Listing</button>
        <div className="delete-signout">
          <p onClick={handleDeleteAccount}>Delete Account</p>
          <p>Sign out</p>
        </div>
        <div className="show-listing">
          <p>Show Listings</p>
        </div>
      </div>
    </div>
  );
}
