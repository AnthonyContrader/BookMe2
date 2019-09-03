import React from 'react';
import User from '../models/user';

export default class HomeUser extends React.Component {

    

    logout = () =>{
      localStorage.clear();
      this.props.history.push('/login');
    }

    render() {
      return (
        <div>
            <div>
                <h1 className="Content">HOME USER</h1>
            </div>
            <div>
                <button onClick={this.logout}>Logout</button>
            </div>
        </div>
      );
    }
}