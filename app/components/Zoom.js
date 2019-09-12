import React from 'react'

export default class Nav extends React.Component {

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

