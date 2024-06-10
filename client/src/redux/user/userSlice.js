import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    siginStart: (state) => {
      state.loading = true;
    },

    siginSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },

    signinFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { siginStart, siginSuccess, signinFailure } = userSlice.actions;

export default userSlice.reducer;
