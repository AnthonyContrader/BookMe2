import { Injectable, EventEmitter } from '@angular/core';
import { AbstractService } from './abstractservice';
import { CategoryDTO } from 'src/dto/categorydto';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';

/**
 * I service sono decorati da @Injectable.
 * 
 * @author Vittorio Valent
 * 
 * @see AbstractService
 */
@Injectable({
  providedIn: 'root'
})
export class CategoryService extends AbstractService<CategoryDTO> {


  constructor(http: HttpClient) {
    super(http);
    this.type = 'categories';
    this.micro = 'micro1';
  }

  // getAllCategories(): Observable<CategoryDTO[]> {
  //   return this.http.get<any>('http://localhost:8080/services/micro1/api/categories', {
  //     headers: {
  //       Authorization: this.auth()
  //     }
  //   });
  // }


  // deleteCategory(id: number): Observable<any> {
  //   return this.http.delete('http://localhost:8080/services/micro1/api/categories/'+id, {
  //     headers: {
  //       Authorization: this.auth()
  //     }
  //   });
  // }

  // insertCategory(category: CategoryDTO): Observable<any> {
  //   return this.http.post<CategoryDTO>('http://localhost:8080/services/micro1/api/categories', category, {
  //     headers: {
  //       Authorization: this.auth()
  //     }
  //   });
  // }



}
