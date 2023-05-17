import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/reducer/loginreducer';

// Create the Redux store
const store = configureStore({
  reducer: {
    login: loginReducer,
    // Add other reducers here
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
