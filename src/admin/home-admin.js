import React from 'react';

export default class HomeAdmin extends React.Component {
    logout = () =>{
        localStorage.clear();
        this.props.history.push('/login');
      }
  
      render() {
        return (
          <div>
              <div>
                  <h1 className="Content">HOME ADMIN</h1>
              </div>
              <div>
                  <button onClick={this.logout}>Logout</button>
              </div>
          </div>
        );
      }
}