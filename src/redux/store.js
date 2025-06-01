import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from "./resumeSlice"; // Import reducer

const store = configureStore({
  reducer: {
    resume: resumeReducer, // Add the resume reducer
  },
});

export default store;
