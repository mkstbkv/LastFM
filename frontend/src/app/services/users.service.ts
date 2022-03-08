import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterUserData, User } from '../models/user.model';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  registerUser(userData: RegisterUserData) {
    return this.http.post<User>(env.apiUrl + '/users', userData);
  }
}
