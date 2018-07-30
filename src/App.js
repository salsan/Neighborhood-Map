import React, { Component } from 'react';
import LocalMap from './LocalMap'
import LocalFilter from './LocalFilter'
import cataniaLocations from './Catania.json'
import './App.css';



class App extends Component {

  state = {
          currentLocations : cataniaLocations,
          selectedLocation: {}
  }

  render() {
    const { locations } = this.state;
    console.log( locations);
    return (
      <div className="App">

      <div className="filter">
        <LocalFilter
         locations={this.state.currentLocations}
         selectedLocation={this.state.selectedLocation}
        />
      </div>
     <div className="map">
       <LocalMap
          locations={this.state.currentLocations}
         />
        </div>
      </div>
    );
  }
}

export default App;
