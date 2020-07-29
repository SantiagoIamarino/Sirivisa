import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '../models/message.model';
import { BACKEND_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http: HttpClient
  ) { }

  sendMessage(message: Message) {
    const url = BACKEND_URL + '/emails';

    return this.http.post(url, message);
  }
}
