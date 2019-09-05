import React from 'react';
import User from '../models/user';
import CategoryService from '../services/categoryservice';

export default class HomeUser extends React.Component {

    constructor(props){
        super(props);
        this.categoryService = new CategoryService();
    }

    getAllCategories = async () => {
        const categories = await this.categoryService.getAll();
        this.setState({categories});
    }

    logout = () =>{
      localStorage.clear();
      this.props.history.push('/login');
    }

    showState = () => {
        console.log(this.state);
    }

    render() {
      return (
        <div>
            <div>
                <h1 className="Content">HOME USER</h1>
                <button onClick={this.showState}>Show state</button>
            </div>
            <div>
                <button onClick={this.logout}>Logout</button>
            </div>
        </div>
      );
    }
}