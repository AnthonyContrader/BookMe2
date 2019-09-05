import React, { Component } from 'react';
import './loginStyle.css'; 
import LoginService from './services/loginservice';

class LoginComponent extends Component {

    constructor(props){
        super(props);
        this.loginService = new LoginService();
        this.state = { 
            username: '',
            password: ''
        };
    }
    handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        let jwt = await this.loginService.authenticate(this.state);
        console.log(jwt);
        if(jwt.id_token){
            localStorage.setItem('TOKEN',jwt.id_token);
            console.log('Utente loggato!');
            localStorage.setItem('username',this.state.username);
            const data = await this.loginService.authorities();
            this.props.goTo(data);
        } else {
            alert('Something went wrong');
        }
    }

    render() { 
        return (
            <div className="wrapper">
            <div id="prova" className="form-wrapper">
               <h2> Login on Bookme </h2>
               <form onSubmit={this.handleSubmit} noValidate>

                   <div className="email">
                       <label htmlFor="email"> Username</label>
                       <input type="text" className="" placeholder="Username" name="username" value= {this.state.username} noValidate onChange={this.handleChange}/>
                   </div>

                   <div className="password">
                       <label htmlFor="password"> Password</label>
                       <input type="password" className="" placeholder="Password" name="password" value={this.state.password} noValidate onChange={this.handleChange}/>
                   </div>

                   <div className="buttonLogin">
                       <button type="submit">Login</button>
                       <a href="#" onClick={this.props.showComponent}><small> You don't have an account yet? </small></a>
                   </div>

               </form> 

            </div>
         </div>  
        );
    }
}
 
export default LoginComponent;