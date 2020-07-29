import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';

import swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {

    if (!this.user.email) {
      return;
    }

    if (!this.user.password) {
      return;
    }

    this.loginService.login(this.user)
      .subscribe(
        (res: any) => {
          this.loginService.saveInStorage(res.user, res.token);

          swal('Logged in', 'Logged correctly!', 'success');
          this.loginService.getStorage();
          this.router.navigate(['admin']);
        },
        (error) => {
          if (error.status === 500) {
            swal('Error', error.error.error, 'error');
          } else {
            swal('Error', error.error.message, 'error');
          }
        }
      );
  }
}
