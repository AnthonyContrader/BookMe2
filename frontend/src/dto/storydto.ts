import { CategoryDTO } from './categorydto';
import { UserDTO } from './userdto';
import { NovelDTO } from './novelsdto';

export class StoryDTO {
    
    id: number;

    title: string = '';

    // plot: string = '';

    // published: boolean = false;

    // category: CategoryDTO = new CategoryDTO();

    // user: UserDTO = null;

    // novel: NovelDTO = null;

    author: string;

    category: number;
}
