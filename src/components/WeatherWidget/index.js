import { useCallback, useEffect, useState } from 'react';
import weatherService from '../../services/WeatherService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux';
import { setCurrentWeather } from '../../redux/weather';

const WeatherWidget = (props) => {
    //if the weather data is available, do not show refresh button
    const isDataAvailable = !!props.weatherData;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        // Initial the current weather data for the first time
        loadWeatherData();
    }, []);

    const loadWeatherData = useCallback(async () => {
        // Don't need to call the API if we're reusing the component, use the exisiting weather data from props
        if(isDataAvailable) {
            setData(props.weatherData);
            return;
        }
        setLoading(true);
        try {
            //Call API to get weather data
            const result = await weatherService.getWeatherInfo();
            //Store the response in redux store
            dispatch(setCurrentWeather(result));
            setData(result);
        } catch(error) {
            throw error;
        } finally {
            setLoading(false);
        }
    }, [isDataAvailable]);

    if(loading) {
        return (
            <div className="p-3">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        )
    }
   
    return (
        <div className="card">
            { 
                !isDataAvailable && (<div className="absolute-btn--right">
                    <button type="button" onClick={loadWeatherData} className="btn btn-outline-primary">
                        <FontAwesomeIcon icon={faSyncAlt} />
                    </button>
                </div>)
            }
            <div className="card-body pt-2">
                <div className="row">
                    <div className="col-sm-4 text-center">
                        <img className="img-fluid" alt={data.currentWeather} src={data.icon} />
                    </div>

                    <div className="col-sm-8">
                        <p>{data.currentWeather}</p>
                        <span style={{fontSize: 40}} className="text-center fw-bold">{`${data.temperatureC}\u00b0C`}</span>
                        <p className="card-title">{data.country}</p>
                    </div>
                </div>
            </div>
        </div>
    )
} 

export default WeatherWidget;