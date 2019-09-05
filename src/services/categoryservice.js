import StandardService from './standardservice';

export default class CategoryService extends StandardService{
    constructor(props) {
        super(props);
        this.state.api = '/micro1/api/categories';
    }

}