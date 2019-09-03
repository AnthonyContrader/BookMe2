import React from 'react';
import './Login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import User from './models/user';
import LoginService from './services/loginservice';

export default class Login extends React.Component {
    constructor(props) {
      super(props)
      this.loginService = new LoginService();
      this.state = {
        username: '',
        password: ''
      };
    }
    handleInputChange = (event) => {
      const { value, name } = event.target;
      this.setState({
        [name]: value
      });
    }
        
    onSubmit = async (event) => {
        event.preventDefault();
        var jwt = await this.loginService.authenticate(this.state);
        if(jwt.id_token){
            console.log('Utente loggato!');
            localStorage.setItem('TOKEN',jwt.id_token);
            var data = await this.loginService.authorities();
            console.log(data);
            if(data.includes('ROLE_ADMIN')){
                this.props.history.push('/home-admin');
            } else if(data.includes('ROLE_USER')){
                this.props.history.push('/home-user');
            } else {
                alert('Unauthorized');
            }
        } else {
            alert('Wrong credentials');
        }
      }
    render() {
      return (
        <form className="Login" onSubmit={this.onSubmit}>
          <h1 id="content">Login</h1>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={this.state.username}
            onChange={this.handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
         <Button variant="primary" type="submit">
                Submit
        </Button>
        </form>
      );
    }
  }
