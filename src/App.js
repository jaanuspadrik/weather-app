import React, {Component} from 'react';
import Form from './Form';
import Forecast from './Forecast';
import Title from './Title';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      locations: [],
      selected: false,
      selectedCity: "",
      value: {},
      temperature: undefined,
      wind: undefined,
      error: undefined
    }
    this.handleChange = this.handleChange.bind(this);
    this.getWeather = this.getWeather.bind(this);
  }
  componentDidMount() {
    var getCities = async (e) => {
      const api_call = await fetch('https://weather.aw.ee/api/world/locations');
      let data = await api_call.json();
      let cities = [];
      data.map(city => {
        cities.push(city)
      });
      this.setState({locations: cities});
    };
    getCities();
  }
  getWeather = async (event) => {
    event.preventDefault();
    const city = event.target.elements.city.value;
    if (city) {
      const api_call = await fetch(`https://weather.aw.ee/api/world/locations/${this.state.value.code}`);
      const data = await api_call.json();
      this.setState({
        temperature: data.temperature.value,
        wind: data.wind.value,
        selected: true,
        selectedCity: this.state.value.name,
        error: ""
      });
      document.getElementById("valik").reset();
    } else {
      this.setState({
        selected: false,
        selectedCity: "",
        value: {},
        temperature: undefined,
        wind: undefined,
        error: "Palun vali linn."
      });
      document.getElementById("valik").reset();
    }

  }
  handleChange(event) {
    console.log(event.target.value);
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
