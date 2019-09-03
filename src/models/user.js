import React from 'react';

export default class User extends React.Component{
    state = {
        username: '',
        password: '',
        email: '',
        authorities: ''
    }

    render() {
        return (
            <ul>
                <li>{this.state.username}</li>
                <li>{this.state.password}</li>
                <li>{this.state.email}</li>
                <li>{this.state.authorities}</li>
            </ul>
        );
    }
}