import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/Main';
import Header from './components/Header';
import Favorite from './components/Favorite';
import { withAuth0 } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
class App extends Component {
  render() {
    return (
      <>
        <Router>
          {this.props.auth0.isAuthenticated ?
            <Header
            isAuthenticated={this.props.auth0.isAuthenticated} 
            NAME={this.props.auth0.user.name}/>
            :
            <Header />
          }
          <Switch>
            <Route exact path='/'>
            {this.props.auth0.isAuthenticated ?
              <Main />:<></>}
            </Route>
            <Route exact path='/favorite'>
              {this.props.auth0.isAuthenticated ?
              <Favorite />:<></>}
            </Route>
          </Switch>
        </Router>
      </>
    )
  }
}

export default withAuth0(App);
