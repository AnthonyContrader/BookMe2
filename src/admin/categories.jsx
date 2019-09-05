import React from 'react';
import CategoryService from '../services/categoryservice';

export default class Categories extends React.Component {
    constructor(props){
        super(props);
        this.categoryService = new CategoryService();
        this.state = { categories: [], newCategoryName: '' };
    }

    componentDidMount(){
        this.getAllCategories();
    }

    getAllCategories = async () => {
        let categories = await this.categoryService.getAll();
        this.setState({categories});
    }

    deleteCategory = async (id) => {
        await this.categoryService.delete(id);
        this.getAllCategories();

    }

    insertCategory = async () => {
        await this.categoryService.insert({ name: this.state.newCategoryName});
        this.setState({newCategoryName: ''});
        this.getAllCategories();
    }

    handleChanges = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div>
                <h3>Categories List</h3>
                <ul>
                    {
                        this.state.categories.map(c => 
                        <li key={c.id}>{c.name}
                        <button onClick={() => this.deleteCategory(c.id)}>Delete</button>
                        </li>)
                    }
                </ul>
                <input 
                    type="text"
                    name="newCategoryName"
                    value={this.state.newCategoryName}
                    placeholder="category name"
                    onChange={this.handleChanges}/>
                <button onClick={this.insertCategory}>Add category</button>
            </div>
        );
    }
}
