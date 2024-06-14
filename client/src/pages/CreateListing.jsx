import React, { useState } from "react";
import "../styles/CreateListing.css";
//import { Promise } from "mongoose";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { FaParking } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateListing() {
  const [files, setFiles] = useState({});
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadingError, setImageUploadingError] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filePerc, setFilePerc] = useState(0);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    description: "",
    type: "rent",
    parking: false,
    furnished: false,
    offer: false,
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 50,
    discountPrice: 0,
  });

  console.log(formData);

  const storeImages = async (file) => {
    return new Promise((resolve, reject) => {
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
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleImageUpload = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setImageUploading(true);
      setImageUploadingError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImages(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadingError(false);
          setImageUploading(false);
        })
        .catch((err) => {
          setImageUploadingError(
            "You can only upload up to 6 images per listing"
          );
          setImageUploading(false);
        });
    } else {
      setImageUploadingError("You can not upload more than 6 images");
      setImageUploading(false);
    }
  };

  const handleFormInputsChange = (e) => {
    if (
      e.target.id == "parking" ||
      e.target.id == "offer" ||
      e.target.id == "furnished"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
    if (e.target.id === "rent" || e.target.id === "sale") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      if (formData.imageUrls.length < 1)
        return setError("You must upload at least one(1) image");
      if (+formData.regularPrice < +formData.discountPrice)
        return setError("Discount price must be less than regular price");
      setLoading(true);
      setError(false);
      const res = await fetch("/api/createListing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await res.json(formData);
      setLoading(false);
      if (data.success == false) {
        setError(data.message);
        return;
      }
      navigate(`/listing/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="main-listing">
      <h2>Create Listing</h2>
      <form onSubmit={handleSubmitForm}>
        <div className="row">
          <div className="column-left">
            <div className="inputs">
              <input
                type="text"
                name="title"
                placeholder="Title"
                id="name"
                required
                minLength="10"
                maxLength="100"
                value={formData.name}
                onChange={handleFormInputsChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Street number, name and appartment No."
                id="address"
                required
                value={formData.address}
                onChange={handleFormInputsChange}
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                id="city"
                required
                value={formData.city}
                onChange={handleFormInputsChange}
              />
              <input
                type="text"
                name="province"
                placeholder="Province"
                id="province"
                required
                value={formData.province}
                onChange={handleFormInputsChange}
              />
              <input
                type="text"
                name="postalcode"
                placeholder="Postal code"
                id="postalCode"
                required
                value={formData.postalCode}
                onChange={handleFormInputsChange}
              />
              <textarea
                name="description"
                rows={5}
                id="description"
                placeholder="Description"
                required
                value={formData.description}
                onChange={handleFormInputsChange}
              ></textarea>
            </div>
            <div className="checks">
              <div>
                <input
                  type="checkbox"
                  name="sale"
                  id="sale"
                  checked={formData.type === "sale"}
                  onChange={handleFormInputsChange}
                />
                <span>Sell</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="rent"
                  id="rent"
                  checked={formData.type === "rent"}
                  onChange={handleFormInputsChange}
                />
                <span>Rent</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="parking"
                  id="parking"
                  value={formData.parking}
                  onChange={handleFormInputsChange}
                />
                <span>Parking spot</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="furnished"
                  id="furnished"
                  value={formData.furnished}
                  onChange={handleFormInputsChange}
                />
                <span>Furnished</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="offer"
                  id="offer"
                  value={formData.offer}
                  onChange={handleFormInputsChange}
                />
                <span>Offer</span>
              </div>
            </div>
            <div className="numbers">
              <div>
                <input
                  type="number"
                  name="bedrooms"
                  id="bedrooms"
                  min="1"
                  max="15"
                  required
                  value={formData.bedrooms}
                  onChange={handleFormInputsChange}
                />
                <span>Beds</span>
              </div>
              <div>
                <input
                  type="number"
                  name="bathrooms"
                  id="bathrooms"
                  min="1"
                  max="15"
                  required
                  value={formData.bathrooms}
                  onChange={handleFormInputsChange}
                />
                <span>Baths</span>
              </div>
            </div>
            <div className="prices">
              <div>
                <input
                  type="number"
                  name="regularPrice"
                  id="regularPrice"
                  min="50"
                  max="6000000"
                  required
                  value={formData.regularPrice}
                  onChange={handleFormInputsChange}
                />
                <span>Regular Price</span>
              </div>
              <div>
                <input
                  type="number"
                  name="discountPrice"
                  id="discountPrice"
                  min="0"
                  max="5900000"
                  required
                  value={formData.discountPrice}
                  onChange={handleFormInputsChange}
                />
                <span>Discount Price</span>
              </div>
            </div>
          </div>
          <div className="column-right">
            <p>
              <span>Images</span> The first image will be the cover (max 6)
            </p>
            <div className="uploads">
              <div className="insideuploads">
                <div className="images">
                  <input
                    type="file"
                    multiple
                    onChange={(e) => setFiles(e.target.files)}
                  />
                </div>
                <button type="button" onClick={handleImageUpload}>
                  {imageUploading ? "Uploading" : "UPLOAD"}
                </button>
              </div>
              {filePerc > 0 && filePerc < 100 ? (
                <span className="fileperc-loading">{`Uploading ${filePerc}%`}</span>
              ) : filePerc === 100 ? (
                <span className="fileperc-success">
                  Photos uploaded successfully
                </span>
              ) : (
                ""
              )}
              <div className="error-message">
                {imageUploadingError && imageUploadingError}
              </div>
            </div>
            <button className="create">{loading? "Creating ...":"CREATE LISTING"}</button>
            <p className="for-error">{error && error}</p>
          </div>
        </div>
      </form>
    </main>
  );
}
