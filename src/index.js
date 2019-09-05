import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import Login from './Login';
import { Redirect, Route,  BrowserRouter as Router, Switch } from 'react-router-dom';
import withAuth from './withAuth';
import Notfound from './notfound';
import HomeAdmin from './admin/home-admin';
import HomeUser from './user/home-user';

// ReactDOM.render(<App />, document.getElementById('header'));

const routing = (
    <Router>
        <div>
        <Switch>
      <Route exact path="/login" component={Login} />
      {/* <Route path="/home-admin" component={withAuth(HomeAdmin)} /> */}
      <Route path="/home-admin" component={HomeAdmin} />
      <Route path="/home-user" component={HomeUser} />
      <Redirect to='/login' />
      <Route component={Notfound} />
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(routing, document.querySelector('#root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
