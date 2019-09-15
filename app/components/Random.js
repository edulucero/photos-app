import React from 'react'
import { fetchRandom } from '../utils/api'
import Loading from './Loading'
import User from './User'
import PropTypes from 'prop-types'

function View ({ img, updateImg }) {
  return(
    <div className="random-container">
      <div className="space-between random-navs">
        <a href={img.links.html}>
          <h1 className="rand-title">
            {
              img.description ? img.description.toUpperCase()
              :img.alt_description
              ? img.alt_description.toUpperCase()
              : null
            }
          </h1>
        </a>
        <button onClick={updateImg} className="random-btn">
          Randomise
        </button>
      </div>
      <div className="row">
        <img className="rand-img" src={img.urls.regular} alt=""/>
        <User user={img.user}/>
      </div>
    </div>   
  )
}

View.propTypes = {
  img: PropTypes.object.isRequired,
  updateImg: PropTypes.func.isRequired
}

export default class Random extends React.Component {
  state = {
    img: null,
    error: null
  }

  componentDidMount() {
    this.updateImg()
  }

  updateImg = () => {
    this.setState({ img : null, error: null })
    fetchRandom()
      .then( img => { this.setState({ img, error : null })
      })
      .catch( error => {
        this.setState({ error: "There was an error: " + error.message })
      })
  }

  isLoading = () => {
    const { img, error} = this.state
    return img === null && error === null
  }

  render () {
    const { img, error } = this.state
    return (
      <React.Fragment>
        {this.isLoading() && <Loading text="loading a random photo" />}

        {error && <p className="error-warning">{error}: most likely the request limit has been reached for the hour</p>}

        {img && <View img={img} updateImg={() => this.updateImg()}/>}
      </React.Fragment>
    )
  }

}