import AbstractService from './abstractservice';

export default class UserService extends AbstractService{
    constructor(props) {
        super(props);
        this.state.api += '/users';
    }
}