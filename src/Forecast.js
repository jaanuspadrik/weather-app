import React, {Component} from 'react';
import './App.css';

class Forecast extends Component {

  render() {
    return (
      <div>
        <h1>{this.props.city}</h1>
        <p>{this.props.temperature} °C</p>
        <p>{this.props.wind} m/s</p>
      </div>
    );
  }
}

export default Forecast;
