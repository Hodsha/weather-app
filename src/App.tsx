import { useEffect, useState } from 'react'
import './App.scss';
import axios from 'axios';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";
import { MdLocationOn } from "react-icons/md";
import {AiTwotoneCloud} from "react-icons/ai";
import {BsFillCloudLightningRainFill, BsFillCloudsFill} from "react-icons/bs";

import moment from 'moment';

interface weatherData {
  name: string;
  weather: {
    description: string;
  }[];
  main: {
    temp: number;
    humidity: number;
  }
}


export default function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<weatherData | null>(null);
  const [error, setError] = useState('');
  const dateObj = new Date();
  let day = dateObj.getDate();
  let month = dateObj.getMonth();
  let year = dateObj.getFullYear();
  let todayDate = day + "." + month + "." + year


  const handleSearch = async () => {
    if (city.trim() === '') {
      setError('Please enter a city name');
      setWeatherData(null);
      return;
    }
    const apiKey = 'a200989747b54a5de8cfe70fd54c217d';
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=de`);
      setWeatherData(response.data);
      setError('');
    } catch (error) {
      setWeatherData(null);
      setError('City not found');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    };
  }

  return (
    // <div className="App">
    //   <h1>Weather App</h1>

    //   <div className='weather-left'>

    //   </div>
    //   <button onClick={handleSearch}>Search</button>
    //   {weatherData && (
    //     <div>
    //       <h2>{weatherData.name}</h2>
    //       <p>{weatherData.weather[0].description}</p>
    //       <p>{weatherDescription(weatherData.weather[0].description)}</p>
    //       <p>Temperatur: {Math.round(weatherData.main.temp)}°C</p>
    //       <p>Feuchtigkeit: {weatherData.main.humidity}%</p>
    //     </div>
    //   )}
    //   {error && <p>{error}</p>}
    //   <input
    //     className='input_locaation'
    //     type="text"
    //     placeholder="Enter city name"
    //     value={city}
    //     onChange={(e) => setCity(e.target.value)}
    //     onKeyDown={handleKeyPress}
    //   />
    // </div>

    <div className='box'>
      <div className='overlay'>
        <p className='currentDay'>{moment().format('dddd')}</p>
        <p className='date'>{moment().format('DD MMM YYYY')}</p>
        <div className='information'>
          <MdLocationOn size={30} className="location" />
          <p className='city'>{city}</p>

        </div>
        {/* <p>{city}</p> */}
        <h1 className='titel_information'>Weather Information</h1>
        {weatherData && (
          <>     
          {console.log(weatherData.weather[0].description)}
            <div className='weather_info'>
              <p className='icons'>{weatherDescription(weatherData.weather[0].description)}</p>
              <p className='temperatur'>{Math.round(weatherData.main.temp)}°C</p>
              <p className='weather_description'>{weatherData.weather[0].description}</p>
            </div>
          </>
        )
        }
         {error && <p className='error'>{error}</p>}
        <input
          className='input_locaation'
          type="text"
          placeholder="Enter city name"
          size={5}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
        />

      </div>

      {/* <div>
          <p className='currentDay'>{moment().format('dddd')}</p>
          <p className='date'>{moment().format('DD MMM YYYY')}</p>
          <div><MdLocationOn size={30} className="location" /></div>
          <p className='city'>{city}</p>

        </div>

        <div className='overlay'></div> */}
    </div>
  );
}

function weatherDescription(description: string): JSX.Element | undefined {
  switch (description) {
    case "Klarer Himmel": {
      return <WiDaySunny size={100} className="sunny"/>;
    }
    case "Überwiegend bewölkt": {
      return <BsFillCloudsFill size={100} className="cloudy"/>;
    }
    case "Bedeckt": {
      return <WiCloudy size={100} className="cloudy"/>;
    }
    case "Leichter Regen": {
      return <WiRain size={100} className="rain"/>
    }
    case "Mäßig bewölkt": {
      return<AiTwotoneCloud size={100} className="lightCloud"/>
    }
    case "Schnee": {
      return <WiSnow size={100} className="snow"/>;
    }
    case "Gewitter": {
      return <BsFillCloudLightningRainFill size={100} className="storm"/>;
    }
   case "Ein paar Wolken": {
    return <WiCloudy size={100} className="cloudy"/>;
   }

    default:
      break;
  }
}
