import User from "../models/user";

export default class AbstractService {

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

    getAll = () => {
        return fetch(this.state.uri + this.state.api, this.header())
        .then(res=>res.json());
    }

    get = (elem) => {
        return fetch(this.state.uri + this.state.api + '/' + elem, this.header())
        .then(res=>res.json());
    }

}