import React from 'react';
import { Redirect, Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import Notfound from '../notfound';
import Users from './users';
import UserService from '../services/userservice';


export default class HomeAdmin extends React.Component {
    constructor(props){
        super(props);
        this.userService = new UserService();  
    }
    state = {
        users: []
    }

    showList = async () => {
        this.state.users = await this.userService.getAll();
        console.log(this.state.users);
    }
    logout = () => {
        localStorage.clear();
        this.props.history.push('/login');
      }
  
      render() {
        return (
          <div>
              <div>
                  <h1 className="Content">HOME ADMIN</h1>
                  <button onClick={this.showList}>Show all Users</button>
              </div>
              <div>
                  <button onClick={this.logout}>Logout</button>
              </div>
          </div>
        );
      }
}