import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
export default function withAuth(ComponentToProtect) {
  return class extends Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false,
      };
    }

    auth = function(){
        const token = localStorage.getItem('AUTH');
        console.log('TOKEN -> ' + token);
        if(token){
            return 'Bearer ' + token;
        }
        return '';
    }
    componentDidMount() {
      fetch('http://localhost:8080/api/authenticate',{
        method: 'GET',
        headers: {
          Authorization: this.auth()
        }
      })
        .then(res => {
          if (res.status === 200) {
            this.setState({ loading: false, redirect: true });
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          this.setState({ loading: false, redirect: true });
        });
    }
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  }
}