import React from 'react';
// import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import User from './models/user';
import LoginService from './services/loginservice';
import UserService from './services/userservice';
import LoginComponent from './loginComponent';
import SignupComponent from './signupComponent';
import './loginStyle.css' ;


export default class Login extends React.Component {
    constructor(props) {
      super(props)
      this.loginService = new LoginService();
      this.userService = new UserService();
      this.state = {
        visible: true,
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

   visibility = () =>{
        
      this.setState({visible: this.state.visible = !this.state.visible}) 
      console.log("cliccato",this.state.visible);
   }
        
    onSubmit = async (event) => {
        event.preventDefault();
        let jwt = await this.loginService.authenticate(this.state);
        console.log(jwt);
        if(jwt.id_token){
            localStorage.setItem('TOKEN',jwt.id_token);
            console.log('Utente loggato!');
            // let currentUser = await this.userService.get(this.state.username);
            localStorage.setItem('username',this.state.username);
            let data = await this.loginService.authorities();
            console.log(data);
            if(data.includes('ROLE_ADMIN')){
                this.props.history.push('/home-admin');
            } else if(data.includes('ROLE_USER')){
                this.props.history.push('/home-user');
            } else {
                alert('Unauthorized');
                localStorage.clear();
            }
        } else {
            alert('Something went wrong');
        }
      }
    render() {
      return (

        <div>
            {this.state.visible === true ? <LoginComponent mianonna={this.visibility} /> : <SignupComponent onDelete={this.visibility}/>} 
        </div>   
        /*
        <form className="Login" onSubmit={this.onSubmit}>
          <h1 id="content">Login</h1>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={this.state.username}
            onChange={this.handleInputChange}
            required/>
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
        */
      );
    }
  }
