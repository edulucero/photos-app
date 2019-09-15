import React from 'react'
import Zoom from './Zoom'
import CuratedSwitch from './CuratedSwitch'
import PropTypes from 'prop-types'

function Toolbar({ handleSizeIncrease, handleSizeDecrease, handleReset, handleCuratedSwitch, curated }) {
  return(
    <div className={curated !== null ? "toolbar-container space-between" : "toolbar-container"}>
      {curated !== null
        ? <CuratedSwitch 
            handleCuratedSwitch={handleCuratedSwitch}
            curated={curated}
          />
          : null}
      <Zoom
        handleSizeIncrease={handleSizeIncrease}
        handleSizeDecrease={handleSizeDecrease}
        handleReset={handleReset}
      />
    </div>
  )
}

Toolbar.propTypes = {
  handleSizeIncrease: PropTypes.func.isRequired,
  handleSizeDecrease: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
  handleCuratedSwitch: PropTypes.func,
  curated: PropTypes.bool
}

export default Toolbar