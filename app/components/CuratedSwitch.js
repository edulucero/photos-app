import React from 'react'

export default function CuratedSwitch({handleCuratedSwitch, curated}) {
  return(
    <div className="row">
      <span>Curated</span>
      <label className="switch">
        <input type="checkbox" id="curated-switch" onChange={handleCuratedSwitch} checked={curated}/>
        <span className="slider round"></span>
      </label>
    </div>
  )
}