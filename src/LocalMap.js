import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper} from 'google-maps-react';



export class LocalMap extends Component {

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
        key={location.title}
        title={location.title}
        position={location.location}
        animation={this.props.google.maps.Animation.DROP}
        />
      )}
     </Map>
        </div>







    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyAOAUHlhd3xdvIEqaAabY3GUYuhgRWavzQ')
})(LocalMap)
