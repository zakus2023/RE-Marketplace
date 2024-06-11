import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { app } from "../firebase";
import { siginSuccess, signinFailure } from "../redux/user/userSlice";

export default function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      //creating the popup when a user clicks on the button

      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(siginSuccess(data));

      navigate("/");
    } catch (error) {
      console.log("Could not sign with google", error);
    }
  };
  return (
    <button type="button" onClick={handleClick}>
      Continue with google
    </button>
  );
}
