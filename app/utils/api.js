const api = 'https://api.unsplash.com/photos/?client_id=7e220026c6d790dee1626ff573bc6ab5515f7d209c9830885e581542ff93ab61&per_page=30'
const curatedApi = 'https://api.unsplash.com/photos/curated/?client_id=7e220026c6d790dee1626ff573bc6ab5515f7d209c9830885e581542ff93ab61&per_page=30'

export function fetchPhotos(type, page, curated) {
  if ( curated === false ) {
    return fetch(`${api}&order_by=${type}&page=${page}`)
  .then((res) => res.json())
  .then((data => {
    if (data.errors) {
      throw new Error(data.errors)
    }
    console.log('false')
    return data
  }))
  } else {
    return fetch(`${curatedApi}&order_by=${type}&page=${page}`)
  .then((res) => res.json())
  .then((data => {
    if (data.errors) {
      throw new Error(data.errors)
    }
    console.log('true')
    return data
  }))
  }
  
}

const searchApi = 'https://api.unsplash.com/search/photos/?client_id=7e220026c6d790dee1626ff573bc6ab5515f7d209c9830885e581542ff93ab61&per_page=30'

export function fetchSearch(query, page) {
  return fetch(`${searchApi}&query=${query}&page=${page}`)
  .then((res) => res.json())
  .then((data => {
    if (data.errors) {
      throw new Error(data.errors)
    }
    return data
  }))
}

const apiRandom = 'https://api.unsplash.com/photos/random/?client_id=7e220026c6d790dee1626ff573bc6ab5515f7d209c9830885e581542ff93ab61'

export function fetchRandom() {
  return fetch(apiRandom)
  .then((res) => res.json())
  .then((data) => {
    if (data.errors) {
      throw new Error(data.errors)
    }
    return data
  })
}

