import React, { Component } from 'react';
import EscapeRegExp from 'escape-string-regexp'

export class LocalFilter extends Component {

  state = {
    query: '',
  }

  updateQuery = (query) => {
    this.setState({
     query
    })
  }

  searchQuery = (query) => {
    if (query){
      const matched = new RegExp(EscapeRegExp(query), "i");
      let queryLocations = this.props.locations.filter( location =>
        matched.test(location.title)
      )
       this.props.selectedPlace(queryLocations)
    } else {
      this.props.selectedPlace(this.props.defaultLocations)
    }

    this.updateQuery(query)
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
