import { Component, OnInit } from '@angular/core';
import { ContactService } from '../../../services/contact.service';
import { Message } from '../../../models/message.model';

import swal from 'sweetalert';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  message: Message = new Message();

  constructor(
    private contactService: ContactService
  ) { }

  ngOnInit() {
  }

  sendMessage() {
    if (!this.message.name) {
      swal('Error', 'Name field is empty', 'error');
      return;
    }

    if (!this.message.email) {
      swal('Error', 'Email field is empty', 'error');
      return;
    }

    if (!this.message.phone) {
      swal('Error', 'Phone field is empty', 'error');
      return;
    }

    this.contactService.sendMessage(this.message).subscribe((res: any) => {
      swal('Success', res.message, 'success');
      this.message = new Message();
    }, (error) => {
      swal('Error', 'An error has occured while sending message', 'error');
    });
  }

}
