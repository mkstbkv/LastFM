import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FacebookUserData, LoginUserData, RegisterUserData, User } from '../models/user.model';
import { environment as env } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) { }

  registerUser(userData: RegisterUserData) {
    const formData = new FormData();

    Object.keys(userData).forEach(key => {
      if (userData[key] !== null) {
        formData.append(key, userData[key]);
      }
    });

    return this.http.post<User>(env.apiUrl + '/users', formData);
  }

  loginWithFacebook(userData: FacebookUserData) {
    return this.http.post<User>(env.apiUrl + '/users/facebookLogin', userData);
  }

  login(userData: LoginUserData) {
    return this.http.post<User>(env.apiUrl + '/users/sessions', userData);
  }

  logout() {
    return this.http.delete(env.apiUrl + '/users/sessions');
  }
}
