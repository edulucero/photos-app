import React from 'react'
import { NavLink } from 'react-router-dom'
import Search from './Search'
import { FaCameraRetro } from "react-icons/fa"

    const activeStyle = {
      color: '#3897F0'
    }

export default function Nav() {
  return (
    <div className="nav-wrapper">
      <nav className="space-between">
        <ul className="row">
          <li><NavLink to="/" exact className="nav-link"><FaCameraRetro size={28} color="black"/></NavLink></li>
          <li><NavLink to="/" exact className="nav-link" activeStyle={activeStyle}>Popular</NavLink></li>
          <li><NavLink to="/latest" className="nav-link" activeStyle={activeStyle}>Latest</NavLink></li>
          <li><NavLink to="/oldest" className="nav-link" activeStyle={activeStyle}>Oldest</NavLink></li>
          <li><NavLink to="/random" className="nav-link" activeStyle={activeStyle}>Random</NavLink></li>
        </ul>
        <div>
          <Search />
        </div>
      </nav>
      <div className="border"></div>
    </div>
  )
}