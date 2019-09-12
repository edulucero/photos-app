import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './index.css'
import Grid from './components/Grid'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Random from './components/Random'
import Results from './components/Results'

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="main-container">
          <Nav />
          <main>
            <Switch>
              <Route exact path='/' render={() => <Grid orderBy="popular"/>} />
              <Route exact path='/latest' render={() => <Grid orderBy="latest"/>} />
              <Route exact path='/oldest' render={() => <Grid orderBy="oldest"/>} />
              <Route exact path='/random' component={Random} />
              <Route path='/results' component={Results} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
)