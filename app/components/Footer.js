import React from 'react'

export default function Footer() {
  return(
      <div className="footer-wrapper">
        <footer>
          <div className="footer-border"></div>
          <div className="footer-list-wrapper">
            <ul className="row">
              <li>
                Developed By Eduardo Lucero
              </li>
              <li className="underline">
                <a href="edulucero.com">More Info</a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
  )
}