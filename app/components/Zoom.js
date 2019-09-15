import React from 'react'
import PropTypes from 'prop-types'

export default class Zoom extends React.Component {

  state = {
    size: this.props.size
  }
  render() {
    return(
      <div>
        <button className="zoom-btns plus-minus-btns" onClick={this.props.handleSizeIncrease}>+</button>
        <button className="zoom-btns plus-minus-btns" onClick={this.props.handleSizeDecrease}>-</button>
        <button className="zoom-btns" onClick={this.props.handleReset}>Reset</button>
      </div>
    )
  }
}

Zoom.propTypes = {
  handleSizeIncrease: PropTypes.func.isRequired,
  handleSizeDecrease: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired
}

