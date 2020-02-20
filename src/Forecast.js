import React, {Component} from 'react';
import './App.css';

const Forecast = props => (
  <div className="forecast">
    {props.city && <h1>{props.city}</h1>}
    {props.temperature && <p>Temperatuur: {props.temperature} °C</p>}
    {props.wind && <p>Tuulekiirus: {props.wind} m/s</p>}
    {props.error && <p>{props.error}</p>}
  </div>
)

export default Forecast;
