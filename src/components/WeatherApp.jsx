import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import Cards from './Cards';
import { apiKey } from '../config';


function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      setError("");
      // const apiKey = process.env.VITE_WEATHER_API_KEY;
      // const apiKey = import.meta.env.VITE_WEATHER_API_KEY; 
      
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
       
       const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
         const dailyForecast = processForecastData(forecastRes.data);
        setForecast(dailyForecast);
      

      const data = await res.data;
      console.log(data);
      setWeather(data);
    } catch (err) {
      // setError(err.message);
      // setWeather(null);
      if(err.response){
        if(err.response.status == 404) {
          setError("City not found. Please check the city name.");
        } else if (err.response.status === 401) {
        setError("Unauthorized: Invalid API key or request.");
      } else {
        setError(`Error: ${err.response.data.message || err.message}`);
      }
      } else if (err.request) {
      setError("No response from the server. Please check your network connection.");
    } else {
      setError(`Error: ${err.message}`);
    }  
    setWeather(null);
    setForecast([]);
    }
  };

  const processForecastData = (data) => {
    const dailyData = {};
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date().getDay();

    data.list.forEach(item => {
      const date = new Date(item.dt * 1000);
      const dayIndex = date.getDay();
      const dayName = days[dayIndex];

    if (dayIndex !== today && Object.keys(dailyData).length < 4) {
        if (!dailyData[dayName]) {
          dailyData[dayName] = {
            minTemp: item.main.temp_min,
            maxTemp: item.main.temp_max,
            icon: item.weather[0].icon,
            description: item.weather[0].description
          };
        } else {
          dailyData[dayName].minTemp = Math.min(dailyData[dayName].minTemp, item.main.temp_min);
          dailyData[dayName].maxTemp = Math.max(dailyData[dayName].maxTemp, item.main.temp_max);
        }
      }
    });
    return Object.keys(dailyData).map(day => ({
      day: day,
      ...dailyData[day]
    }));
  };



  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}>
      <input 
        type="text"
        placeholder="Enter a city..."
        value={city}  
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "5px", borderRadius: "10px", marginRight: "10px" }}
      />
      <button onClick={fetchWeather} style={{ padding: "5px 15px", borderRadius: "15px" }}>
        Search
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div className='container'> 
          <div>
            <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
            />
          </div>

          <div>
            <div >
              <p>Today</p>
              <h2>{weather.name}</h2>
              <p>Temperature: {Math.round(weather.main.temp)}°C</p>
              <p>{weather.weather[0].description}</p>
            </div>
          
          </div>
           {/* <div className='AllCards'>
              <Cards weather={weather}/>
              <Cards weather={weather}/>
              <Cards weather={weather}/>
              <Cards weather={weather}/>
            </div> */}
            {forecast.length > 0 && (
        <div className='AllCards' >
          {forecast.map((daily, index) => (
            <Cards
              key={index}
              day={daily.day}
              icon={daily.icon}
              temp={Math.round(daily.maxTemp)}
            />
          ))}
        </div>
      )}
            
          
        </div>
      )}
      
    </div>
  )
}

export default WeatherApp


