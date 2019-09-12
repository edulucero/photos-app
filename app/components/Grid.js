import React from 'react'
import { fetchPhotos, fetchPage } from '../utils/api'
import Loading from './Loading'
import Toolbar from './Toolbar'
import Pagination from './Pagination'
import User from './User'

export default class Grid extends React.Component {
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
    
    this.setState({
      imgs: null,
      error: null
    })

    fetchPhotos(this.props.orderBy, this.state.page, this.state.curated)
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
    console.log('triggered')
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

  handleModal = (img) => {
    const { urls, user} = img
    const { url } = urls.full
    console.log(user)
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
            <ul className="grid">
              {imgs.map((img) => {
                const { id, urls, description, alt_description } = img
                const  url  = urls.regular
                return(
                  <li key={id}>
                    <a href={img.links.html}>
                      <img className="grid-img" src={url} alt={description ? description : alt_description}/>
                    </a>
                  </li>
                )
              })}
            </ul>
            <Pagination pages={pages} page={page} fetch={this.handlePageChange}/>
          </div>
        }
      </React.Fragment>
    )
  }
}