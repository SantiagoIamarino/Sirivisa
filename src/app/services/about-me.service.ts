import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../config/config';
import { LoginService } from '../service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AboutMeService {

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  getAboutContent() {
    const url = BACKEND_URL + '/about';

    return this.http.get(url);
  }

  editAboutMe(about) {
    let url = BACKEND_URL + '/about';
    url += '?token=' + this.loginService.token;

    return this.http.put(url, about);
  }
}
