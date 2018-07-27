import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';



export class LocalMap extends Component {
  state = {
    showingInfoWindow: false,
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

    const styles = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
];

    return (

        <div>
          <Map
             google={this.props.google}
             initialCenter={{
             lat: 37.502496,
             lng: 15.087076
             }}
             zoom={13}
             styles={styles}
             mapTypeControl={false}
            >

      {this.props.locations.map(location =>
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
