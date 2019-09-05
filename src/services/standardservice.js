export default class StandardService {

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

    async getAll(){
        const res = await fetch(this.state.uri + this.state.api, this.header());
        return await res.json();
    }

    async get(value){
        const res = await fetch(this.state.uri + this.state.api + '/' + value, this.header());
        return await res.json();
    }

    async insert(value){
        const res = await fetch(this.state.uri + this.state.api, {
            method: 'POST',
            body: JSON.stringify(value),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.auth()
            }
        });
        return await res.json();
    }

    async delete(value) {
        return await fetch(this.state.uri + this.state.api + '/' + value, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + this.auth()
            }
        });
    }

    async update(value) {
        const res = await fetch(this.state.uri + this.state.api, {
            method: 'PUT',
            body: JSON.stringify(value),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + this.auth()
            }
        });
        return await res.json();
    }

}