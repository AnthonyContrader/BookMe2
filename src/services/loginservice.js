import User from "../models/user";

export default class LoginService {

    state = {
        uri: 'http://localhost:8080',
        api: '/api'
    }

    auth(){
        return localStorage.getItem('TOKEN');
    }

    header(){
        return {
            headers: {
                Authorization: 'Bearer ' + this.auth()
            }
        };
    }

    authenticate = (value) => {
        return fetch(this.state.uri + this.state.api + '/authenticate', {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(res=>res.json());
    }

    authorities = (value) => {
        return fetch(this.state.uri + this.state.api + '/users/authorities', this.header()).then(res=>res.json());
    }

}