import WeatherInfo from '../model/WeatherInfo';
import weatherReducer, { setCurrentWeather } from './weather';
  
  describe('weather reducer', () => {
    const initialState = {
        currentWeather: null,
    };
    it('should handle initial state', () => {
      expect(weatherReducer(undefined, { type: 'unknown' })).toEqual({
        currentWeather: null,
      });
    });
  
    it('show store current weather successfully', () => {
      const actual = weatherReducer(initialState, setCurrentWeather(new WeatherInfo('VN', 33, 70, 'Sunny', 'icon_url')));
      expect(actual.currentWeather.country).toEqual('VN');
      expect(actual.currentWeather.temperatureC).toEqual(33);
      expect(actual.currentWeather.temperatureF).toEqual(70);
      expect(actual.currentWeather.currentWeather).toEqual('Sunny');
      expect(actual.currentWeather.icon).toEqual('icon_url');
    });
  });
  