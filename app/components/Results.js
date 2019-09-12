import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import queryString from 'query-string'
import { fetchSearch } from '../utils/api'
import Loading from './Loading'
import Toolbar from './Toolbar'
import Pagination from './Pagination'

export default class Results extends React.Component {
  state = {
    imgs: null,
    error: null,
    pages: [],
    page: 1,
    sizes: [150, 180, 225, 300, 450, 900],
    size: 3,
  }

  componentDidMount() {
    this.getResults()
  }

  componentDidUpdate(prevProps) {
    if( this.props.location.search !== prevProps.location.search ) {
      this.getResults()
    }
  }

  componentWillUnmount() {
    document.getElementById("search-bar").value = ""
  }
 
  getResults = () => {
    const { query } = queryString.parse(this.props.location.search)
    const { page } = this.state

    this.setState({
      imgs: null, 
      error: null
    })

    fetchSearch(query, page)
    .then(imgs => this.setState({
      imgs,
      error: null
    }))
    .then(imgs => {
      this.getPagesArray(this.state.imgs.total_pages)
    })
    .catch(() => {
      this.setState({
        error: "error fetching search"
      })
    })

    
  }

  getPagesArray = (pages) => {
    const pagesArray = []
    for(let i = 1; i <= pages; i++) {
      pagesArray.push(i)
    }
  this.setState({
    pages: pagesArray.slice(0, 12)
  })
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

  isLoading = () => {
    const { imgs, error} = this.state

    return imgs === null && error === null
  }

  handlePageChange = (page) => {
    this.setState( () => ({
      page
    }), () => {
      this.getResults()
    })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0;
  }

  render() {
    const { imgs, error, pages, page} = this.state
    return(
      <React.Fragment>
        {this.isLoading() && <Loading />}

        {error && <p>Error</p>}


        {imgs &&
          <div className="grid-wrapper">
            <Toolbar 
              handleSizeIncrease={this.handleSizeIncrease}
              handleSizeDecrease={this.handleSizeDecrease}
              handleReset={this.handleResetSize}
              handleCuratedSwitch={this.handleSwitch}
              curated={null}
            />
            <div className="results-meta-info">
              <span>{imgs.total} found</span>
            </div>
            <ul className="grid">
              { 
                imgs.results.map((imgs) => {

                const { id, urls, description, alt_description } = imgs
                const  url  = urls.regular
                
                return(
                  <li key={id}>
                    <a href={imgs.links.html}>
                      <img
                        className="grid-img"
                        src={url}
                        alt={description ? description : alt_description}
                      />
                    </a>
                  </li>
                  )
                })
              }
            </ul>
            <Pagination pages={pages} page={page} fetch={this.handlePageChange}/>
          </div>
        }
      </React.Fragment>
    )
  }
}