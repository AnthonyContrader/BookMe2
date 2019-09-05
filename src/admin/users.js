import React from 'react';
import UserService from '../services/userservice';

export default class Users extends React.Component {
    constructor(props){
        super(props);
        this.userService = new UserService();
        
    }

    componentDidMount(){
        this.getCurrentUser(localStorage.getItem('username'));
        this.getAllUsers();
    }

    getCurrentUser = async (username) => {
        const currentUser = await this.userService.get(username);
        this.setState({currentUser});
    }

    getAllUsers = async () => {
        const users = await this.userService.getAll();
        this.setState({users});
    }

    render() {
        return (
            <div>
                <h3>User List</h3>
                <ul>
                    {
                        this.state.users.map(user => <li>{user.login}</li>)
                    }
                </ul>
            </div>
        );
    }
}
