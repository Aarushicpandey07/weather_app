import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sunnyBackground from './assets/sunny.jpeg';
import cloudyBackground from './assets/cloudy.jpg';
import fogBackground from './assets/fog.jpg';
import mistBackground from './assets/mist.jpg';
import snowyBackground from './assets/snowy.jpg';
import hazeBackground from './assets/haze.jpeg';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [backgroundImage, setBackground] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=89583110bcefeb91e02eb7267e0113df`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation('');
    }
  };

  useEffect(() => {
    // Check if data.weather is available and update backgroundImage accordingly
    if (data.weather) {
      setBackground(getBackgroundImageForWeather(data.weather[0].main));
    }
  }, [data]);

  const getBackgroundImageForWeather = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clear':
        return sunnyBackground;
      case 'Clouds':
        return cloudyBackground;
      case 'Fog':
        return fogBackground;
      case 'mist':
         return mistBackground;
      case 'snowy':
      return snowyBackground;
      case 'Haze':
        return hazeBackground;
      // Add more cases for other weather conditions as needed
      default:
        return ''; // Default background image
    }
  };
  const appClassName = `App ${backgroundImage ? 'transition-background' : ''}`;
  return (
    <div className="App" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className='search'>
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className='location'>
            <p>{data.name}</p>
          </div>
          <div className='temp'>
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="Description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className='feels'>
              {data.main ? <p className='bold'>{data.main.feels_like}°C</p> : null}
              <p>Feels like</p>
            </div>
            <div className='Humidity'>
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH </p> : null}
              <p>Wind speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
