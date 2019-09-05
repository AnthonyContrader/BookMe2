import React from 'react';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import User from './models/user';
// import LoginService from './services/loginservice';
// import UserService from './services/userservice';
import LoginComponent from './loginComponent';
import SignupComponent from './signupComponent';
import './loginStyle.css' ;


export default class Login extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        visible: true,
        
      };
    }


   visibility = () =>{
        
      this.setState({visible: !this.state.visible }); 
   }
        
 

    goTo = (data) => {
        if(data.includes('ROLE_ADMIN')){
            this.props.history.push('/home-admin');
        } else if(data.includes('ROLE_USER')){
            this.props.history.push('/home-user');
        } else {
            alert('Unauthorized');
            localStorage.clear();
        }
    }
    render() {
      return (

        <div>
            {this.state.visible ?
                <LoginComponent showComponent={this.visibility} goTo={this.goTo}/>
                : <SignupComponent showComponent={this.visibility}/>} 
        </div>   
      );
    }
  }
