import React, { Component} from 'react';
import './App.css';

function CitySearchField(props) {

  const handleInputChange = (cityName) => {
    fetch(`https://ctp-zip-api.herokuapp.com/city/${cityName.toUpperCase()}`)
      .then(response => response.json())
      .then(zips => props.saveZips(zips))
  }

  return (
    <div className="App-search">
      <b>Type a City Name</b>
      <input onChange={(event) => handleInputChange(event.target.value)}/>
    </div>
  )
}

function ZipList(props){
  return (
    <div className="App-city-results">
      <ul>
        {props.zips.map(zip => <li>{zip}</li>)}
      </ul>
    </div>
  )
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zips: [],
      groupedStates: {}
    }
  }
  getStates(){
    Promise.all(this.state.zips.map(zip => new Promise((resolve, reject) => {
      fetch(`http://ctp-zip-api.herokuapp.com/zip/${zip}`)
      .then(response => response.json())
      .then(citiesInfo => {
        citiesInfo.map(city => {
          let stateCopy = {...this.state}
          stateCopy.groupedStates[city.State] ? 
            stateCopy.groupedStates[city.State].push(city) :
            stateCopy.groupedStates[city.State] = [city];
          this.setState(stateCopy)
          return resolve()
        })
      })
    }))).then(() => {}).catch(()=> alert('An error Occured'))
  }

  saveZips(zips) {
    this.setState({zips})
    this.getStates()
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>City Search</h2>
        </div>
          <CitySearchField saveZips={(zips) => this.saveZips(zips)}/>
          <div>
            {this.state.zips.length ? <ZipList zips={this.state.zips}/> : <div>Empty</div>}
          </div>
      </div>
    );
  }
}
export default App;
