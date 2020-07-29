import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user;
  token;

  constructor(
    private http: HttpClient
  ) {

    this.getStorage();

   }

  login(user) {
    const url = BACKEND_URL + '/users/login';

    return this.http.post(url, user);
  }

  saveInStorage(user, token) {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
  }

  getStorage() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user'));
      this.token = localStorage.getItem('token');
    }
  }

  logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.user = null;
    this.token = null;
  }
}
