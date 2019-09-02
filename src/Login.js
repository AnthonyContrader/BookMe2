import React from 'react';
import './Login.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
        .then(res => {
            console.log(res);
          if (res.status === 200) {
              localStorage.setItem('AUTH',res);
            this.props.history.push('/home');    
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .then( data => {
            //localStorage.setItem("token", data.jwt);
            console.log(data);
        })
        .catch(err => {
          console.error(err);
          alert('Error logging in please try again');
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
