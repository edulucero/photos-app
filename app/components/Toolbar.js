import React from 'react'
import Zoom from './Zoom'
import CuratedSwitch from './CuratedSwitch'

export default function Toolbar({ handleSizeIncrease, handleSizeDecrease, handleReset, handleCuratedSwitch, curated }) {
  return(
    <div className={curated !== null ? "toolbar-container space-between" : "toolbar-container"}>
      {curated !== null ? <CuratedSwitch handleCuratedSwitch={handleCuratedSwitch} curated={curated}/> : null}
      <Zoom
        handleSizeIncrease={handleSizeIncrease}
        handleSizeDecrease={handleSizeDecrease}
        handleReset={handleReset}
      />
    </div>
  )
}