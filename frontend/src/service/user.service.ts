import { Injectable } from '@angular/core';
import { AbstractService } from './abstractservice';
import { UserDTO } from 'src/dto/userdto';
import { HttpClient } from '@angular/common/http';
import { LoginDTO } from 'src/dto/logindto';
import { Observable, of } from 'rxjs';

/**
 * I service sono decorati da @Injectable.
 * Qui trovate, oltre ai metodi ereditati dall'Abstract,
 *  il metodo per il login (in mirror con il backend).
 * @author Vittorio Valent
 * @see AbstractService
 */
@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractService<UserDTO>{

  /*
  constructor(http: HttpClient) {
    super(http);
    this.type = 'user';
  }

  login(loginDTO: LoginDTO): Observable<UserDTO> {
    return this.http.post<any>('http://localhost:8080/' + this.type + '/login', loginDTO);
  }
*/

constructor(http: HttpClient) {
  super(http);
  this.type ='users';
 this.port = '8080';
}

login(loginDTO: LoginDTO): Observable<UserDTO> {
return this.http.post<any>('http://localhost:8080/api/authenticate', loginDTO);
}


register(userdto: UserDTO): Observable<UserDTO> {
  return this.http.post<UserDTO>('http://localhost:8080/api/register', userdto );
}

activated(userdto: UserDTO): Observable<UserDTO> {
  return this.http.post<UserDTO>('http://localhost:8080/api/activate', userdto );
}
  
getAllUser(): Observable<UserDTO[]> {
  return this.http.get<any>('http://localhost:8080/api/users', {
    headers: {
      Authorization: this.auth()
    }
  });
}

}
