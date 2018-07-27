import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';



export class LocalMap extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
    return (
        <div>
          <Map
             google={this.props.google}
             initialCenter={{
             lat: 37.502496,
             lng: 15.087076
             }}
             zoom={13}
            >

      {this.props.locations.map(location =>
        <Marker
        onClick={this.onMarkerClick}
        key={location.title}
        title={location.title}
        position={location.location}
        animation={this.props.google.maps.Animation.DROP}
        />
      )}

        <InfoWindow
             marker={this.state.activeMarker}
             visible={this.state.showingInfoWindow}>
               <div>
                 <h1>{this.state.selectedPlace.title}</h1>
               </div>
         </InfoWindow>
     </Map>
        </div>

    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAOAUHlhd3xdvIEqaAabY3GUYuhgRWavzQ')
})(LocalMap)
