import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from '../redux/weather';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
  },
});
