import { configureStore } from "@reduxjs/toolkit";
import authSliceReducers from "../utils/authSlice";
import problemSliceReducers from "../utils/problemSlice";

const store = configureStore({
  reducer: {
    auth: authSliceReducers,
    problemSlice: problemSliceReducers,
  },
});

export default store;
