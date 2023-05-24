import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/reducer/loginreducer';
import profileReducer from '../features/reducer/profilereducer';

// Create the Redux store
const store = configureStore({
  reducer: {
    login: loginReducer,
    profile: profileReducer,
    // Add other reducers here
  },
  devTools: process.env.NODE_ENV !== 'production',
});
export default store;
