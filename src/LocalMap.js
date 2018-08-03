import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import MapStyles from './style.json'



export class LocalMap extends Component {
  state = {
    placeImgUrl :  './img/loading.gif',
  };

  /* this function return color  for marker icon */
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

 setThumbnail = (query) => {
   if ( query !== this.state.placeImgUrl) {
    this.setState({
        placeImgUrl: query
    })
  }
 }

 getThumbnail = (query, id ) => {
   const api = 'https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles='
   const pithumbsize = 200;
   const format = 'json'
   let url = api + encodeURIComponent(query) + "&pithumbsize=" + pithumbsize + '&format=' + format + '&origin=*&utf8=&format=json'

   if ( id !== undefined){
     fetch(url, {
       method: "GET",
       headers: {
         "Content-Type": "application/json; charset=utf-8"
       }
     })
     .then(response => response.json())
     .then(data =>  {
            this.setThumbnail(data.query.pages[id].thumbnail.source)
      }).catch(error => console.error(error))
    }

 }



  render() {
    const { locations } = this.props;

    /* variable for wikipedia api */
    var description;
    var placeID;
    let placeImgAlt = 'Loading';

    /* variable for icon color marker */
    let defaultIcon = '0089ff';
    let highlightedIcon = 'ff211c';


    /* if current place is without query information add it */
     this.props.defaultLocations.filter( place =>
      this.props.selectedPlace.title === place.title ).forEach( place =>
        {
          description = place.query;
          placeID = place.id
          placeImgAlt = place.title
          this.getThumbnail( description, placeID)
        }
      )

    /* Center Automatic the Map  */
    var bounds = new this.props.google.maps.LatLngBounds();
    this.props.locations.map ( place =>
     bounds.extend(place.location)
     )


    return (
    <div>
      <Map
             google={this.props.google}
             initialCenter={{
             lat: 37.512977,
             lng: 15.078748
             }}
             bounds={bounds}
             styles={MapStyles}
             mapTypeControl={false}
            >

      {
        locations.map(location =>
        <Marker
          onClick={this.props.onMarkerClick}
          key={location.title}
          title={location.title}
          position={location.location}
          animation={( (location.title === this.props.selectedPlace.title) &&
            this.props.google.maps.Animation.DROP) }
            icon={ (location.title === this.props.selectedPlace.title) ?
              ( this.makeMarkerIcon( defaultIcon) ) :
              ( this.makeMarkerIcon(highlightedIcon) )
        }
         />
      )}

        <InfoWindow
             marker={this.props.activeMarker}
             position={this.props.selectedPlace.location}
             visible={this.props.showingInfoWindow}
        >
               <div className="infowwindow-dialog">
                 <h1 className="infowwindow-title">{this.props.selectedPlace.title}</h1>

                   <img alt={placeImgAlt}  src={this.state.placeImgUrl}/>

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
