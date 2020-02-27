import React from "react";
import './App.css';

const Form = (props) => {
  const {getWeather, handleChange, locations} = props;
  return (
    <div className="search">
      <form id="valik" onSubmit={getWeather}>
        <input type="text" name="city" list="cities" autoComplete="off" onChange={handleChange}/>
        <datalist id="cities">
          {locations.map((obj) => {
            return <option key={obj.code} value={obj.name}>{obj.name}</option>
          })}
        </datalist>
        <input type="submit" value="Otsi" />
      </form>
    </div>
  )  
};

export default Form;
