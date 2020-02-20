import React from "react";
import './App.css';

const Form = props => (
  <div className="search">
    <form id="valik" onSubmit={props.getWeather}>
      <input type="text" name="city" list="cities" autoComplete="off" onChange={props.handleChange}/>
      <datalist id="cities">
        {props.locations.map((obj) => {
          return <option key={obj.code} value={obj.name}>{obj.name}</option>
        })}
      </datalist>
      <input type="submit" value="Otsi" />
    </form>
  </div>
);

export default Form;
