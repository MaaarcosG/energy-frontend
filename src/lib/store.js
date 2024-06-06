import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./features/api/apiSlice";

const store = configureStore({
  reducer: {
    api: apiSlice,
  },
});

export default store;
