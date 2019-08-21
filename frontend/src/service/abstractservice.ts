import { Service } from './service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserDTO } from 'src/dto/userdto';

/**
 * Service astratto, implementa tutti i metodi CRUD inviando request al server di SpringBoot. 
 * @param port il port del backend
 * @param type la mappatura del controller di ciascuna entità.
 * 
 * @see Service
 * 
 * @author Vittorio Valent
 */
export abstract class AbstractService<DTO> implements Service<DTO> {

    type: string;
    port = '8080';
    micro: string;

    constructor(protected http: HttpClient) {
    }

    auth() {
        const user = JSON.parse(localStorage.getItem('AUTOKEN')) as UserDTO;
        // console.log(user);
        if (user) {
            return 'Bearer ' + user.authorities;
        } else {
            return '';
        }
    }

    userLogged(username: string) {
        // console.log('qua: ', this.auth());
        // console.log(this.auth());
        return this.http.get('http://localhost:8080/api/users/' + username, {
            headers: {
                Authorization: this.auth()
            }
        });
    }

    getAll(): Observable<DTO[]> {
        return this.http.get<DTO[]>('http://localhost:' + this.port + '/' + this.micro + '/api/' + this.type, {
            headers: {
                Authorization: this.auth()
            }
        });
    }

    read(id: number): Observable<DTO> {
        return this.http.get<DTO>('http://localhost:' + this.port + '/' + this.micro + '/api/' + this.type + '/' + id, {
            headers: {
                Authorization: this.auth()
            }
        });
    }

    delete(id: number): Observable<any> {
        return this.http.delete('http://localhost:' + this.port + '/' + this.micro + '/api/' + this.type + '/' + id, {
            headers: {
                Authorization: this.auth()
            }
        });
    }

    insert(dto: DTO): Observable<any> {
        return this.http.post<DTO>('http://localhost:' + this.port + '/' + this.micro + '/api/' + this.type, dto, {
            headers: {
                Authorization: this.auth()
            }
        });
    }

    update(dto: DTO): Observable<DTO> {
        return this.http.put<DTO>('http://localhost:' + this.port + '/' + this.micro + '/api/' + this.type, dto, {
            headers: {
                Authorization: this.auth()
            }
        });

    }
}
