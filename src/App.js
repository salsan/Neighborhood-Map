import React, { Component } from 'react';
import LocalMap from './LocalMap'
import LocalFilter from './LocalFilter'
import cataniaLocations from './Catania.json'
import './App.css';


window.gm_authFailure = (error) => {
  const mapWarning = document.querySelector('.map');
  mapWarning.innerHTML = `<div class='warning-dialog'><h2 class='warning-title'>Warning</h2><p class='warning-message'>Something failed, more info in console<p></div>`;

}


class App extends Component {

  state = {
          currentLocations : cataniaLocations,
          defaultLocations:  cataniaLocations,
          showingInfoWindow: false,
          activeMarker: {},
          selectedPlace: {},
  }

  onMarkerClick = (props, marker, e) =>
  {
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
      })
  }



selectedPlace = ( locations ) => {
  this.setState ({
    currentLocations: locations
  })
}

  render() {
    return (
      <div role='main' className="App">
      <div className="filter">
        <LocalFilter
         locations={this.state.currentLocations}
         defaultLocations={this.state.defaultLocations}
         selectedPlace={this.selectedPlace}
         onMarkerClick={this.onMarkerClick}
         activeMarker={this.state.activeMarker}
        />
      </div>
     <div className="map">
       <LocalMap
          locations={this.state.currentLocations}
          showingInfoWindow={this.state.showingInfoWindow}
          onMarkerClick={this.onMarkerClick}
          activeMarker={this.state.activeMarker}
          selectedPlace={this.state.selectedPlace}

         />
        </div>
      </div>
    );
  }
}

export default App;
