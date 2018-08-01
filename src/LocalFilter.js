import React, { Component } from 'react';
import EscapeRegExp from 'escape-string-regexp'

export class LocalFilter extends Component {

  state = {
    query: '',
    lenQuery: 0
  }

  updateQuery = (query) => {
    this.setState({
     query,
    })
  }

  lengthQuery = () => {
    this.setState((prevState) => ({
      lenQuery: prevState.query.length
    }));

  }

  searchQuery = (query) => {
    if (query ){
      const matched = new RegExp(EscapeRegExp(query), "i");
      let queryLocations = this.props.locations.filter( location =>
        matched.test(location.title)
      )
       this.props.selectedPlace(queryLocations)
    } else {
      this.props.selectedPlace(this.props.defaultLocations)
    }
    this.updateQuery(query)

    /* This is a workaround for backspace press button */

    if ( this.state.lenQuery > query.length){
      const matched = new RegExp(EscapeRegExp(query), "i");
      let queryLocations = this.props.defaultLocations.filter( location =>
      matched.test(location.title)
      )
      this.props.selectedPlace(queryLocations)
    }

    /* Store last length value on a new variable*/
    this.lengthQuery(query)

  }

  render(){
    return ( <div className="container">Filter
    <div className="search">
      <input
        role="search"
        type="text"
        placeholder="filter list locations"
        value = {this.state.query}
        onChange={(event)=>this.searchQuery(event.target.value)}
      />
    </div>
    <ul className="locations-list">
    {

    this.props.locations.map(location => (
        <li className="location"
          key={location.title}
          onClick={()=>this.props.onMarkerClick(location)}
         >
         {location.title}
        </li>
      ) )
    }
  </ul>
  </div>)
  }
}

export default LocalFilter
