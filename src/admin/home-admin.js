import React from 'react';
import { Redirect, Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import Notfound from '../notfound';
import Users from './users';
import UserService from '../services/userservice';
import User from '../models/user';


export default class HomeAdmin extends React.Component {
    constructor(props){
        super(props);
        this.userService = new UserService();
        this.getCurrentUser(localStorage.getItem('username')); 
        // this.getAllUsers();
    }

    getCurrentUser = async (username) => {
        const currentUser = await this.userService.get(username);
        this.setState({currentUser});
    }

    getAllUsers = async () => {
        var users = await this.userService.getAll();
        this.setState({users});
    }

    state = {
        users: []
    }

    showState = () => {
        console.log(this.state);
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
                  <button onClick={this.showList}>Show state</button>
              </div>
              <div>
                  <button onClick={this.logout}>Logout</button>
              </div>
          </div>
        );
      }
}