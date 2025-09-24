import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import Cards from './Cards';

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    try {
      setError("");
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY; 
      // const apiKey = import.meta.env.WHEATHERFREEAPI; 
      
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        // `https://api.weatherapi.com/v1/current.json?key={apiKey}&q={city}&aqi=no`
      );
      const data = await res.data;
      console.log(data);
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };
  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "Arial" }}>
      {/* <h1>Weather App</h1> */}
      <input 
        type="text"
        placeholder="Enter a city..."
        value={city}  
        onChange={(e) => setCity(e.target.value)}
        style={{ padding: "5px", borderRadius: "10px", marginRight: "10px" }}
      />
      <button onClick={fetchWeather} style={{ padding: "10px 20px", }}>
        Search
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <div className='container'> 
          <div>
            <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                // src={`//cdn.weatherapi.com/weather/64x64/night/113.png`}
                alt="weather icon"
            />
          </div>

          <div>
            <div style={{ marginTop: "20px" }}>
              <h2>{weather.name}</h2>
              <p>Temperature: {Math.round(weather.main.temp)}°C</p>
              <p>{weather.weather[0].description}</p>
            </div>
          
          </div>
           <div className='AllCards'>
              <Cards weather={weather}/>
              <Cards weather={weather}/>
              <Cards weather={weather}/>
              <Cards weather={weather}/>
            </div>
            
          
        </div>
      )}
      
    </div>
  )
}

export default WeatherApp
