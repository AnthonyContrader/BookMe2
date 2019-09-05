import React from 'react';
// import { Redirect, Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
// import Notfound from '../notfound';
// import Users from './users';
import UserService from '../services/userservice';
// import User from '../models/user';
import CategoryService from '../services/categoryservice';


export default class HomeAdmin extends React.Component {
    _isMount = false;

    constructor(props){
        super(props);
        this.userService = new UserService();
        this.categoryService = new CategoryService();
        this.getCurrentUser(localStorage.getItem('username'));
        this.getAllUsers();
        this.getAllCategories();
    }

    componentDidMount(){
        this._isMount = true;
    }

    componentWillUnmount(){
        this._isMount = false;
    }

    getAllCategories = async () => {
        const categories = await this.categoryService.getAll();
        if(this._isMount){ this.setState({categories}); }
    }

    getCurrentUser = async (username) => {
        const currentUser = await this.userService.get(username);
        if(this._isMount){ this.setState({currentUser}); }
    }

    getAllUsers = async () => {
        var users = await this.userService.getAll();
        if(this._isMount){ this.setState({users}); }
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
                  <button onClick={this.showState}>Show state</button>
              </div>
              {/* <div>
                  <h3>User List</h3>
                  <ul>
                        
                  </ul>
              </div> */}
              <div>
                  <button onClick={this.logout}>Logout</button>
              </div>
          </div>
        );
    }
}