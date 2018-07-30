import React, { Component } from 'react';
import LocalMap from './LocalMap'
import LocalFilter from './LocalFilter'
import cataniaLocations from './Catania.json'
import './App.css';



class App extends Component {

  state = {
          currentLocations : cataniaLocations,
          selectedLocation: {},
          showingInfoWindow: false,
  }

activeInfoBox = ( box ) => {
  this.setState ({
    showingInfoWindow: true
  })
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
         activeInfoBox={this.activeInfoBox}
         showingInfoWindow={this.state.showingInfoWindow}
        />
      </div>
     <div className="map">
       <LocalMap
          locations={this.state.currentLocations}
          showingInfoWindow={this.state.showingInfoWindow}
          activeInfoBox={this.activeInfoBox}
         />
        </div>
      </div>
    );
  }
}

export default App;
