import { createSlice } from '@reduxjs/toolkit';

//Initial state for the weather store
const initialState = {
  currentWeather: null,
};

// The `reducers` field lets us define reducers and generate associated actions
export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCurrentWeather: (state, action) => {
      state.currentWeather = action.payload;
    },
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Get the current weather data from redux store
export const selectCurrentWeatherInfo = (state) => state.weather.currentWeather;

//Expose the action in order for Weather Widget to load the current weather data into redux store
export const { setCurrentWeather } = weatherSlice.actions;

//Expore the reducer, this will be used to configure the app redux store
export default weatherSlice.reducer;
