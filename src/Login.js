import React from 'react';
import './Login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import User from './models/user';

// function Login() {
//     return (
//         <div className="Login">
//             <h1 id="content">Login</h1>
//             <Form>
//   <Form.Group controlId="formBasicUsername">
//     <Form.Label>Username</Form.Label>
//     <Form.Control type="text" placeholder="Enter username" />
//   </Form.Group>

//   <Form.Group controlId="formBasicPassword">
//     <Form.Label>Password</Form.Label>
//     <Form.Control type="password" placeholder="Password" />
//   </Form.Group>
//   <Button variant="primary" type="submit">
//     Submit
//   </Button>
// </Form>
//         </div>
//     );
// }

// export default Login;

export default class Login extends React.Component {
    constructor(props) {
      super(props)
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
        
    onSubmit = (event) => {
        event.preventDefault();
        fetch('http://localhost:8080/api/authenticate', {
               method: 'POST',
               body: JSON.stringify(this.state),
               headers: {
                 'Content-Type': 'application/json'
               }
             })
             .then(res => res.json())
             .then((jwt) => 
             {
                if(jwt.id_token){
                    console.log(jwt.id_token);
                    console.log('Utente loggato!');
                    localStorage.setItem('TOKEN',jwt.id_token);
                    fetch('http://localhost:8080/api/users/' + this.state.username,{
                        headers: {
                            Authorization: 'Bearer ' + jwt.id_token
                        }
                     })
                    .then(res => res.json())
                    .then((data) => {
                        console.log(data.authorities);
                        if(data.authorities.includes('ROLE_ADMIN')){
                            this.props.history.push('/home-admin');
                        } else if(data.authorities.includes('ROLE_USER')){
                            this.props.history.push('/home-user');
                        } else {
                            alert('Unauthorized');
                        }
                    })
                } else {
                    alert('Wrong credentials');
                }
            
            });
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
