import React, { Component, useState } from 'react';
import './App.css';

// const ZIP_API = "http://ctp-zip-api.herokuapp.com";
// const mockResponse = [{"RecordNumber":"247","Zipcode":"10018","ZipCodeType":"STANDARD","City":"NEW YORK","State":"NY","LocationType":"PRIMARY","Lat":"40.71","Long":"-73.99","Xaxis":"0.20","Yaxis":"-0.72","Zaxis":"0.65","WorldRegion":"NA","Country":"US","LocationText":"New York, NY","Location":"NA-US-NY-NEW YORK","Decommisioned":"false","TaxReturnsFiled":"4416","EstimatedPopulation":"5928","TotalWages":"810026753","Notes":""}]

// async function fetchCities(event, setCities) {
//     // public Promise<Object> fetch(String url)

//     ///
//     const zipcode = event.target.value;
//     // const theList = await fetch(`${ZIP_API}/zip?zipcode=${zipcode}`)
//     const theList = {content: mockResponse};
//     setCities(theList.content);
// }

// function City(props) {
//   console.log(props.City);
//   return (<div>
//     <div className="city-heading"> </div>
//     <ul>
//       <li>State: {props.State}</li>
//     </ul>
//   </div>);
// }

// function ZipSearchField(props) {
//   return (
//   <div className="App-search">
//     <b>Zip Code: </b>
//     <input onChange={event => fetchCities(event, props.setCities)} />

//   </div>);
// }

// // {"RecordNumber":"247","Zipcode":"10018","ZipCodeType":"STANDARD"}
// function App() {
//   const [cities, setCities] = useState([]);
//   // console.log(cities);

//   const cityComponents = cities.map(city => 
//     <City
//       key={city.RecordNumber}
//       {...city}
//       />)
//   return (
//     <div className="App">
//       <div className="App-header">
//         <h2>Zip Code Search</h2>
//       </div>
//       <ZipSearchField setCities={setCities} />
//       <div className="App-city-results">
//         {cityComponents}
//       </div>
//     </div>
//   );
// }

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <h2>Zip Code Search</h2>
//         </div>
//         <ZipSearchField />
//         <div className="App-city-results">
          
//           <City />
//           <City />
//         </div>
//       </div>
//     );
//   }
// }

function City(props) {

  return (
  <div className="App-city-results">
    <div className="App-city-results-header">
      {props.city.City}, {props.city.State}
    </div>
    <div className="content">
      <ul>
        <li>State: {props.city.State}</li>
        <li>Location: ({props.city.Lat}, {props.city.Long})</li>
        <li>Population (estimated): {props.city.EstimatedPopulation}</li>
        <li>Total Wages: {props.city.TotalWages}</li>
      </ul>
    </div>
  </div>);
}

function ZipSearchField(props) {
  const handleInputChange = (value) => {
    if (value.length > 4){
      fetch(`https://ctp-zip-api.herokuapp.com/zip/${value}`)
      .then(response => response.json())
      .then(cities => props.saveCities(cities))
    }
  }
  return (<div className="App-search">
    <b>Zip Code: </b>
    <input placeholder="Try 10002" onChange={(event) => handleInputChange(event.target.value)}></input> 

  </div>
    );
}


class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      cities: []
    }
  }
  saveCities(cities){
    this.setState({cities});

    const cityComponents = cities.map(city => 
      <City
        key={city.RecordNumber}
        {...city}
        />)
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Zip Code Search</h2>
        </div>
        <ZipSearchField saveCities={(cities) => this.saveCities(cities)}/>
        <div>
        {!this.state.cities.length && <div>Empty</div>}
          {this.state.cities.map((city) => <City city={city}/>)}
        </div>
      </div>
    );
  }
}
export default App;
