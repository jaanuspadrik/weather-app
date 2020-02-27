import React from 'react';
import './App.css';

const Forecast = (props) => {
  const {city, temperature, wind, error} = props;
  return (
    <div className="forecast">
      {city && <h1>{city}</h1>}
      {temperature && <p>Temperatuur: {temperature} °C</p>}
      {wind && <p>Tuulekiirus: {wind} m/s</p>}
      {error && <p>{error}</p>}
    </div>
  )
}

export default Forecast;
