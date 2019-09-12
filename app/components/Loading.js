import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  content: {
    fontSize: '1rem',
    position: 'absoulte',
    left: '0',
    right: '0',
    marginTop: '20px',
    textAlign: 'center'
  },
  container: {
    paddingBottom: "100vh"
  }
}

export default class Loading extends React.Component {
  
  state = { content: this.props.text }
  
  componentDidMount () {
    const { speed, text } = this.props

    this.interval = window.setInterval(() => {
      this.state.content === text + '...'
        ? this.setState({ content: text})
        : this.setState(( {content} ) => ({ content: content + '.'}))
    }, speed)

  }
  componentWillUnmount () {
    window.clearInterval(this.interval)
  }
  render() {
    return (
      <div style={styles.container}>
        <p style={styles.content}>
          {this.state.content}
        </p>
      </div>
    )
  }
}

Loading.propTypes = {
  text: PropTypes.string.isRequired,
  speed: PropTypes.number.isRequired
}

Loading.defaultProps = {
  text: 'Loading',
  speed: 300
}