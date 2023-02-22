import React from 'react';
import axios from 'axios';
import { useState, useEffect } from "react";
function City() {
  const [city, setCity] = useState('');
  const [forecast, setForecast] = useState([]);
  const [weatherData, setWeatherData] =useState(null);

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=bc2083584e034dcdb0c135900231602&q=${city}&days=10`);
      setForecast(response.data.forecast.forecastday);
      setWeatherData(response.data);

      
      console.log("request receieved")
    } catch (error) {
      console.log(error.message);
    }
  };
  

  return (
    <div>
    <nav className="navbar">
      <img src='weather-wizard.png' className="image-logo"/>
        <form onSubmit={handleSubmit} className="search-container">
      <input type="text" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Search.." />
        <button type="submit">

            <i className="fa fa-search"></i>
            </button>
            </form>
      
    </nav>  
{(weatherData && forecast) ? (
<div className="weather-box">
<div className="current-temp">
            <h1>{weatherData.location.name}</h1>
            
             <p>Current temperature: {weatherData.current.temp_c} °C</p>
             <p>Wind Speed: {weatherData.current.wind_kph} kph</p>
             <p>Humidity: {weatherData.current.humidity} </p> 
             <p>Feels like {weatherData.current.feelslike_c} °C</p>      
</div>
<div> 
{forecast.length > 0 && (
  <div className="forecast-container">
    {forecast.map((day) => (
      <div key={day.date} className="forecast-card">
        <h2>{day.date}</h2>
        <img src={day.day.condition.icon}/>
        <div className="condition-text">{day.day.condition.text}</div>
        <div className="avgtemp-text">{day.day.avgtemp_c}°C</div>
      </div>
    ))}
  </div>
)}

      </div>
</div>) : (
  <h1 className="else-block">data is loading</h1>
)

            }
 </div>         
  );
};


export default City;