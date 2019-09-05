import AbstractService from './abstractservice';

export default class CategoryService extends AbstractService{
    constructor(props) {
        super(props);
        this.state.api = '/micro1/api/categories';
    }
}