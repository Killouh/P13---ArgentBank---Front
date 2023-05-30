import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/reducer/loginreducer";
import profileReducer from "../features/reducer/profilereduceur";

// Create the Redux store
const store = configureStore({
  reducer: {
    login: loginReducer,
    profile: profileReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
export default store;
