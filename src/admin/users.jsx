import React from 'react';
import UserService from '../services/userservice';

export default class Users extends React.Component {
    constructor(props){
        super(props);
        this.userService = new UserService();
        this.state = { currentUser: {}, users: [], username: '', password: '', authorities: ['ROLE_USER'] };
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
        let users = await this.userService.getAll();
        this.setState({users});
    }

    deleteUser = async (username) => {
        if(username !== this.state.currentUser.login) {
            await this.userService.delete(username);
            this.getAllUsers();
        }
    }
    
    insertUser = async () => {
        const data = { 
            username: this.state.username,
            password: this.state.password,
            login: this.state.username,
            authorities: this.state.authorities,
            email: this.state.username + '@localhost'
        }
        // console.log(data);
        await this.userService.insert(data);
        this.getAllUsers();
    }

    handleChanges = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    handleSelectChanges = (event) => {
        const { value, name } = event.target;
        // console.log(value);
        this.setState({[name]: [value]});
        // console.log(this.state.authorities);
    }

    render() {
        return (
            <div>
                <h2>Welcome { this.state.currentUser ? this.state.currentUser.login : ''}</h2>
                <h3>User List</h3>
                <ul>
                    {
                        this.state.users.map(u => 
                        <li key={u.login}>
                            {u.login}
                            <button onClick={() => this.deleteUser(u.login)}>Delete</button>
                        </li>)
                    }
                    
                </ul>
                <input 
                    type="text"
                    name="username"
                    value={this.state.username}
                    placeholder="username"
                    onChange={this.handleChanges}/>
                <input 
                    type="text"
                    name="password"
                    value={this.state.password}
                    placeholder="password"
                    onChange={this.handleChanges}/>
                <select name="authorities" onChange={this.handleSelectChanges} defaultValue="USER">
                    <option value="ROLE_USER">USER</option>
                    <option value="ROLE_ADMIN">ADMIN</option>
                </select>
                <button onClick={this.insertUser}>Add User</button>
            </div>
        );
    }
}
