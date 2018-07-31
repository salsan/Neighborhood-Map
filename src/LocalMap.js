import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import MapStyles from './style.json'



export class LocalMap extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    defaultIcon : '0089ff',
    highlightedIcon : 'ff211c'
  };

  onMarkerClick = (props, marker, e) =>
  {
      this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
      })
  this.props.activeInfoBox ( props, marker, e)
  }

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  makeMarkerIcon = (markerColor) => {
   var markerImage = new this.props.google.maps.MarkerImage(
     'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
     '|40|_|%E2%80%A2',
     new this.props.google.maps.Size(21, 34),
     new this.props.google.maps.Point(0, 0),
     new this.props.google.maps.Point(10, 34),
     new this.props.google.maps.Size(21,34));
   return markerImage;
 }


  render() {
    const { locations } = this.props;

    console.log(this.state.showingInfoWindow)
    return (

        <div>
          <Map
             google={this.props.google}
             initialCenter={{
             lat: 37.502496,
             lng: 15.087076
             }}
             zoom={13}
             styles={MapStyles}
             mapTypeControl={false}
            >

      {locations.map(location =>
        <Marker
        onClick={this.onMarkerClick}
        key={location.title}
        title={location.title}
        position={location.location}
        animation={( (location.title === this.state.selectedPlace.title) &&
          this.props.google.maps.Animation.DROP) }
        icon={ (location.title === this.state.selectedPlace.title) ?
          ( this.makeMarkerIcon( this.state.defaultIcon) ) :
          ( this.makeMarkerIcon( this.state.highlightedIcon) )

        }
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
