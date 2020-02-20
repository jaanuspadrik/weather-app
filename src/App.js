import React, {Component} from 'react';
import Form from './Form';
import Forecast from './Forecast';
import Title from './Title';
import './App.css';

class App extends Component {
  state = {
    locations: [],
    selectedCity: undefined,
    value: {},
    temperature: undefined,
    wind: undefined,
    error: undefined
  }
  componentDidMount() {

  }
  getCities = async (e) => {
    const api_call = await fetch('https://weather.aw.ee/api/world/locations');
    let data = await api_call.json();
    let cities = [];
    data.map(city => {
      cities.push(city)
    });
    this.setState({locations: cities});
  };
  getWeather = async (event) => {
    event.preventDefault();
    const city = event.target.elements.city.value;
    if (city) {
      const api_call = await fetch(`https://weather.aw.ee/api/world/locations/${this.state.value.code}`);
      const data = await api_call.json();
      console.log(data);
      this.setState({
        temperature: data.temperature.value,
        wind: data.wind.value,
        selectedCity: this.state.value.name,
        error: "",
        locations: []
      });
      document.getElementById("valik").reset();
    } else {
      this.setState({
        selectedCity: undefined,
        value: {},
        temperature: undefined,
        wind: undefined,
        error: "Palun vali linn."
      });
      document.getElementById("valik").reset();
    }
  }
  handleChange = (event) => {
    this.getCities();
    let otsing = this.state.locations.find(city => city.name === event.target.value);
    if(otsing) {
      this.setState({value: otsing})
    }
  }
  render() {
    return (
      <div className="container">
        <Title />
        <Form
          getWeather={this.getWeather}
          handleChange={this.handleChange}
          locations={this.state.locations}
        />
        <Forecast
          city={this.state.selectedCity}
          temperature={this.state.temperature}
          wind={this.state.wind}
          error={this.state.error}
        />
      </div>
    );
  }
}

export default App;
