import React, { useEffect, useRef, useState } from "react";
import'./Weather.css';

import search_icon from '../assets/search.png';
import wind_icon from '../assets/wind.png';
import humidity_icon from '../assets/humidity.png';

import clear_icon from '../assets/clear.png';
import moon from '../assets/moon.png';
import fewclouds from '../assets/fewclouds.png';
import fewcloudsn from '../assets/fewcloudsn.png';
import cloud_icon from '../assets/cloud.png';
import cloud_iconn from '../assets/cloudn.png';
import drizzle_icon from '../assets/brokenclouds.png';
import drizzle_iconn from '../assets/brokencloudsn.png';
import showerrain from '../assets/showerrain.png';
import showerrainn from '../assets/showerrainn.png';
import rain_icon from '../assets/rain.png';
import rain_iconn from '../assets/rainn.png';
import thunderstorm from  '../assets/thunderstorm.png';
import thunderstormn from '../assets/thunderstormn.png';
import snow_icon from '../assets/snow.png';
import mist from '../assets/mist.png';
const Weather =()=>{
    const [weatherData, setWeatherData] = useState({
        humidity: null,
        windSpeed: null,
        temperature: null,
        location: '',
        icon: clear_icon,
    });
    const inputRef = useRef();

    const allIcons = {
        "01d": clear_icon,
        "01n": moon,
        "02d": fewclouds,
        "02n": fewcloudsn,
        "03d": cloud_icon,
        "03n": cloud_iconn,
        "04d": drizzle_icon,
        "04n": drizzle_iconn,
        "09d": showerrain,
        "09n": showerrainn,
        "10d": rain_icon,
        "10n": rain_iconn,
        "11d": thunderstorm,
        "11n": thunderstormn,
        "13d": snow_icon,
        "13n": snow_icon,
        "50d": mist,
        "50n": mist,
    };

    const search = async (city) => {
        if (city === "") {
            alert("Enter City Name");
            return;
        }

        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=6ad87b2f4cc7a8fa99d3c28a50daab77`;

            const response = await fetch(url);
            const data = await response.json();
            
            if (!response.ok) {
                alert("City not found");
                return;
            }

                const icon = allIcons[data.weather[0].icon] || cloud_icon;
            
                setWeatherData({
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    temperature: Math.floor(data.main.temp),
                    location: data.name,
                    icon: icon
                });
            
            } catch (error) {
                alert("Error fetching data");
                setWeatherData({
                    humidity: null,
                    windSpeed: null,
                    temperature: null,
                    location: '',
                    icon: clear_icon
                });
            }
        };
        const handleKeyPress = (event) => {
            if (event.key === 'Enter') {
                search(inputRef.current.value);
            }
        };
   
    useEffect(() => {
        search("Sri Lanka");
    }, []);

  return (
    <div className="weather ">
        <div className="search-bar">
            <input ref={inputRef} type="text" placeholder="Search"onKeyDown={handleKeyPress}/>
            <img src={search_icon} alt="search" onClick={()=>search(inputRef.current.value)}/>
        </div>
        {weatherData.temperature !== null ? (
                <> 
        <img src={weatherData.icon} alt="weather" className="weather-icon"/>
        <p className="temperature">{weatherData.temperature}°C</p>
        <p className="location">{weatherData.location}</p>  
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="data"/>
                <div>
                    <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt="data"/>
                <div>
                    <p>{weatherData.windSpeed}Km/h</p>
                    <span>wind</span>
                </div>
            </div>
        </div>   </>
           ) : (
            <p>No weather data available.</p>
        )}
    </div>
  )
  
}
export default Weather;