import React from 'react';
// import { Redirect, Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
// import Notfound from '../notfound';
import Users from './users';
// import UserService from '../services/userservice';
// import User from '../models/user';
// import CategoryService from '../services/categoryservice';
import Categories from './categories';


export default class HomeAdmin extends React.Component {

    // showState = () => {
    //     console.log(this.state);
    // }

    logout = () => {
        localStorage.clear();
        this.props.history.push('/login');

    }

  
    render() {
        return (
          <div>
              <div>
                  <h1 className="Content">HOME ADMIN</h1>
              </div>
              <table>
                  <tbody>
                  <tr>
                      <td><Users /></td>
                      <td><Categories /></td>
                  </tr>
                  </tbody>
              </table>
              <div>
                  {/* <button onClick={this.showState}>Show state</button> */}
                  <button onClick={this.logout}>Logout</button>
              </div>
          </div>
        );
    }
}