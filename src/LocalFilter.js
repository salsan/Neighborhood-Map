import React, { Component } from 'react';

export class LocalFilter extends Component {

  state = {
    query: '',
    matchLocation: []
  }

  updateQuery = (query) => {
    this.setState({
     query : query
    })
  }

  render(){
    console.log(this.state.query);
    return ( <div className="container">Filter
    <div className="search">
      <input
        role="search"
        type="text"
        placeholder="filter list locations"
        value = {this.state.query}
        onChange={(event)=>this.updateQuery(event.target.value)}
      />
    </div>
    <ul className="locations-list">
    {

    this.props.locations.filter( match =>  !(match.title.search(this.state.query)))
        .map(location => (
        <li className="location"
          key={location.title}
          onClick={(event)=>this.props.activeInfoBox()}
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
