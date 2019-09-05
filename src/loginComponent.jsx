import React, { Component } from 'react';
import './loginStyle.css'; 

class LoginComponent extends Component {
    state = { 
        username: '',
        password: ''
     };
     
     handleChange = (event) => {
        const { value, name } = event.target;
        this.setState({
          [name]: value
        });
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
                       <a href="#" onClick={this.props.mianonna}><small> You don't have an account yet? </small></a>
                   </div>

               </form> 

            </div>
         </div>  
        );
    }
}
 
export default LoginComponent;