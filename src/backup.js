<form id="valik" onSubmit={this.handleSubmit}>
  <input type="text" list="cities" onChange={this.handleChange}/>
  <datalist id="cities">
    {this.state.locations.map((obj) => {
      return <option key={obj.code} value={obj.name}>{obj.name}</option>
    })}
  </datalist>
  <input type="submit" value="Otsi" />
</form>
