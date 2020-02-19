import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Forecast from './Forecast';
import axios from 'axios';
import './App.css';

class Select extends Component {
  constructor(props){
    super(props);
    this.state = {
      locations: [],
      selected: false,
      selectedCity: "",
      value: {},
      temperature: "",
      wind: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    axios.get('https://weather.aw.ee/api/world/locations').then(res => {
      let data = res.data;
      let cities = [];
      data.map(city => {
        cities.push(city)
      });
      this.setState({locations: cities});
      console.log(this.state.locations)
    })
  }
  handleSubmit(event) {
    event.preventDefault();
    axios.get(`https://weather.aw.ee/api/world/locations/${this.state.value.code}`).then(res => {
      let data = res.data;
      console.log(data);
      this.setState({temperature: data.temperature.value, wind: data.wind.value, selected: true, selectedCity: this.state.value.name});
    });
    document.getElementById("valik").reset();
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
      <div className="search">
        <form id="valik" onSubmit={this.handleSubmit}>
          <input type="text" list="cities" onChange={this.handleChange}/>
          <datalist id="cities">
            {this.state.locations.map((obj) => {
              return <option key={obj.code} value={obj.name}>{obj.name}</option>
            })}
          </datalist>
          <input type="submit" value="Otsi" />
        </form>
        {this.state.selected ? <Forecast city={this.state.selectedCity} temperature={this.state.temperature} wind={this.state.wind}/> : null}
      </div>
    );
  }
}

export default Select;
