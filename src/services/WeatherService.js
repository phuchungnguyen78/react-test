import axios from "axios";
import WeatherInfo from "../model/WeatherInfo";
import {API_KEY, API_URL, DEFAULT_LOCATION} from '../utils/APIConfig'

// Get weather information by free weather API. Query by default location name "London"
const weatherService = {
    getWeatherInfo: async function() {
        try {
            const response = await axios.get(`${API_URL}/current.json?key=${API_KEY}&q=${DEFAULT_LOCATION}`);
            const {location, current} = response.data;
            return new WeatherInfo(location.country, current.temp_c, current.temp_f, current.condition.text, current.condition.icon);
        }
        catch(error) {
            throw error;
        }
    }
}

export default weatherService;