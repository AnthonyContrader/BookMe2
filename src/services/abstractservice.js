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

    getAll(){
        return fetch(this.state.uri + this.state.api, this.header())
        .then(res=>res.json());
    }

    get(value){
        return fetch(this.state.uri + this.state.api + '/' + value, this.header())
        .then(res=>res.json());
    }

    insert(value){
        return fetch(this.state.uri + this.state.api, { 
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.auth()
            }
        })
        .then(res=>res.json());
    }

    delete(value) {
        return fetch(this.state.uri + this.state.api + '/' + value, { 
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + this.auth()
            }
        })
        .then(res=>res.json());
    }

    update(value) {
        return fetch(this.state.uri + this.state.api, { 
            method: 'PUT',
            body: JSON.stringify(value),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.auth()
            }
        })
        .then(res=>res.json());
    }

}