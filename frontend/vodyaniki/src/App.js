// src/App.js

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Home from './Home';
import Login from './Login';
import Protected from './Protected';

function onAuthRequired({history}) {
  history.push('/login');
}

const oktaOrgUrl = "https://dev-412895.okta.com";
const oktaDomain = "https://vodyaniki.com";
const clientID = '0oa29o277pUsUJukT4x6';


// Check auth and reg.
class App extends Component {
  render() {
    return (
      <Router>
        <Security issuer='https://${oktaDomain}/oauth2/default'
                  clientId='{clientID}'
                  redirectUri={window.location.origin + '/implicit/callback'}
                  onAuthRequired={onAuthRequired}
                  pkce={true} >
          <Route path='/' exact={true} component={Home} />
          <SecureRoute path='/protected' component={Protected} />
          <Route path='/login' render={() => <Login baseUrl='https://${oktaDomain}' />} />
          <Route path='/implicit/callback' component={ImplicitCallback} />
        </Security>
      </Router>
    );
  }
}

export default App;