import { environment } from './../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Users } from '../../interfaces/user.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { UserApiResponseInterface } from '../../interfaces/users-api-response.interface';

const API_BASE = environment.api;

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {}

    /**
     * Subscribing userlist API to get all users list
     * @return: Observable<HttpResponse<UserApiResponseInterface[]>>
     */
    getUsersList(): Observable<HttpResponse<UserApiResponseInterface>> {
        const url = API_BASE + 'listusers';
        return this.http.get<UserApiResponseInterface>(url, { observe: 'response' });
    }
}
