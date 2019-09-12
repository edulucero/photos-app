import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'

export default class Search extends React.Component {
  state = {
    search: ""
  }

  handleChange = (event) => {
    this.setState({
      search: event.target.value
    })
  }

  handleKeyDown = (event) => {
    if(event.key === 'Enter' && this.state.search.length > 0) {
      document.getElementById("search-btn").click()
    }
  }

  render () {
    return(
      <div>
        <input
          className="search-bar"
          id="search-bar"
          type="text"
          placeholder="Search"
          value={this.state.search}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <Link
          to={{
            pathname: '/results',
            search: `?query=${this.state.search}`
          }}
        >
          <button className="search-btn" id="search-btn"><FaSearch size={14} /></button>      
        </Link>         
      </div>
    )
  }
}