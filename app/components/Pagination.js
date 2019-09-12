import React from 'react'

const activeStyle = {
  // textDecoration: "underline",
  color: "#3897F0"
}

export default function Pagination({pages, page, fetch}) {
  return(
    <div className="pagination-container">
      <ul className="row">
        {pages.map( num => {
          return(
            <li key={num} onClick={() => fetch(num)} style={num === page ? activeStyle : null}>
              {num}
            </li>
          )
        })}
      </ul>
    </div>
  )
}