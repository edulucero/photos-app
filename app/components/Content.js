import React from 'react'
import PropTypes from 'prop-types'

import { fetchPhotos } from '../utils/api'

import Loading from './Loading'
import Toolbar from './Toolbar'
import Grid from './Grid'
import Pagination from './Pagination'

export default class Content extends React.Component {
  
  state = {
    imgs: null,
    error: null,
    pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    page: 1,
    sizes: [150, 180, 225, 300, 450, 900],
    size: 3,
    curated: false
  }

  componentDidMount() {
    this.updateImgs()
  }

  componentDidUpdate(prevProps, prevState) {
    if ( prevProps.orderBy !== this.props.orderBy || prevState.curated !== this.state.curated) {
      this.setState( () => ({
        page: 1,
      }), () => {
        this.updateImgs()
      })
    }
    const imgs = document.querySelectorAll("img")
    const { sizes, size } = this.state
    this.setImgSize(imgs, sizes[size]) 
  }

  updateImgs = () => {
    const { orderBy } = this.props
    const { page, curated } = this.state

    fetchPhotos(orderBy, page, curated)
      .then((imgs) => this.setState({
        imgs,
        error: null
      }))
      .catch(() => {
        console.warn('Error fetching images', error)
        this.setState({
          error: "error fetching images"
        })
      })
  }
  
  isLoading = () => {
    const { imgs, error} = this.state
    return imgs === null && error === null
  }

  handleSizeIncrease = () => {
    const imgs = document.querySelectorAll("img")
    this.state.size < 5
    ? this.setState(prevState => ({
       size: prevState.size + 1
      }), () => {
        const { sizes, size } = this.state
        this.setImgSize(imgs, sizes[size])
      })
    : null
  }

  handleSizeDecrease = () => {
    const imgs = document.querySelectorAll("img")
    this.state.size > 0
    ? this.setState(prevState => ({
        size: prevState.size - 1
      }), () => {
        const { sizes, size } = this.state
        this.setImgSize(imgs, sizes[size])
      })
    : null
  }

  handleResetSize = () => {
    const imgs = document.querySelectorAll("img")

    this.setState(({
      size: 3
    }), () => {
      const { sizes, size } = this.state
      this.setImgSize(imgs, sizes[size])
    })
  }

  setImgSize = (imgs, size) => {
    imgs.forEach((img) => {
      img.style.width = size + "px"
      img.style.height = size + "px"
    })
  }

  handlePageChange = (page) => {
    this.setState( () => ({
      page
    }), () => {
      this.updateImgs()
    })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0;
  }

  handleSwitch = () => {
    if ( document.getElementById("curated-switch").checked === true) {
      this.setState({
        curated: true
      })
    } else {
      this.setState({
        curated: false
      })
    }
  }

  render () {
    const { imgs, error, pages, page} = this.state
    return(
      <React.Fragment>
        {this.isLoading() && <Loading text="Loading photos"/>}

        {error && <p>Error</p>}

        {imgs &&
          <div className="grid-wrapper">
            <Toolbar handleSizeIncrease={this.handleSizeIncrease} handleSizeDecrease={this.handleSizeDecrease} handleReset={this.handleResetSize} handleCuratedSwitch={this.handleSwitch} curated={this.state.curated}/>
            <Grid imgs = {imgs}/>
            <Pagination pages={pages} page={page} fetch={this.handlePageChange}/>
          </div>
        }
      </React.Fragment>
    )
  }
}

Content.propTypes = {
  orderBy: PropTypes.string.isRequired
}