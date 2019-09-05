import StandardService from './standardservice';

export default class UserService extends StandardService{
    constructor(props) {
        super(props);
        this.state.api += '/users';
    }
}