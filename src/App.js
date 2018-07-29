import React, { Component } from 'react';
import LocalMap from './LocalMap'
import LocalFilter from './LocalFilter'
import './App.css';



class App extends Component {
  state = {
          locations : [
           {title: 'Piazza Duomo', location: {lat: 37.502496, lng: 15.087076}},
           {title: 'Stadio Angelo Massimino', location: {lat: 37.515807, lng: 15.071064}},
           {title: 'Teatro Massimo Bellini', location: {lat: 37.504207, lng: 15.090006}},
           {title: 'Aeroporto', location: {lat: 37.467305, lng: 15.065775}},
           {title: 'ASD Scacchi Catania', location: {lat: 37.523458, lng: 15.067489}}
         ]
  }
  render() {
    return (
      <div className="App">
        
      <div className="filter">
        <LocalFilter
         locations={this.state.locations}
        />
      </div>
     <div className="map">
       <LocalMap
          locations={this.state.locations}
         />
        </div>
      </div>
    );
  }
}

export default App;
