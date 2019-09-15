import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './index.css'
import Content from './components/Content'
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
              <Route exact path='/' render={() => <Content orderBy="popular"/>} />
              <Route exact path='/latest' render={() => <Content orderBy="latest"/>} />
              <Route exact path='/oldest' render={() => <Content orderBy="oldest"/>} />
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