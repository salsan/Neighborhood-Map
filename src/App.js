import React, { Component } from 'react';
import LocalMap from './LocalMap'
import LocalFilter from './LocalFilter'
import cataniaLocations from './Catania.json'
import './App.css';



class App extends Component {

  state = {
          currentLocations : cataniaLocations,
          defaultLocations:  cataniaLocations,
          showingInfoWindow: false,
  }

activeInfoBox = ( props, marker, e ) => {
  this.setState ({
    selectedPlace: props,
    activeMarker: marker,
    showingInfoWindow: true
  })

}

selectedPlace = ( locations ) => {
  this.setState ({
    currentLocations: locations
  })
}

  render() {
    return (
      <div className="App">
      <div className="filter">
        <LocalFilter
         locations={this.state.currentLocations}
         defaultLocations={this.state.defaultLocations}
         selectedPlace={this.selectedPlace}
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
