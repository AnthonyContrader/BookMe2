import { Usertype } from './usertype';


/**
 * Classe DTO di User. DEVE essere uguale (stesso nome classe, stessi attributi e stessi nomi) a
 * quello nel backend. 
 * 
 * @see Usertype
 * 
 * 
 */
export class UserDTO {

   id: number;

   login: string;

   email: string;

   password: string;

   authorities: string;

   firstName: string;

   lastName: string;

   imageUrl: string;

   activated: boolean = false;

   langKey: string;
   
   createdBy: string;

   createdDate: Date;

   lastModifiedBy: string;

   lastModifiedDate: Date;
   
}

