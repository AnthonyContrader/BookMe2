import React, { Component } from 'react';
import './loginStyle.css' ; 

class SignupComponent extends Component {
    state = {  }
    render() { 
        return (
            <div className="wrapper">
            <div id="prova" className="form-wrapper">
               <h2> Signup on Bookme </h2>
               <form onSubmit={this.handleSubmit} noValidate>
                   <div className="email">
                       <label htmlFor="email"> Username</label>
                       <input type="text" className="" placeholder="Username" name="username" noValidate onChange={this.handleChange}/>
                   </div>

                   <div className="email">
                       <label htmlFor="email"> Email</label>
                       <input type="text" className="" placeholder="Email" name="Email" noValidate onChange={this.handleChange}/>
                   </div>

                   <div className="password">
                       <label htmlFor="password"> Password</label>
                       <input type="password" className="" placeholder="Password" name="password" noValidate onChange={this.handleChange}/>
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
 
export default SignupComponent;