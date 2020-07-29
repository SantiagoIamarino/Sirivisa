import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../service/login.service';

import swal from 'sweetalert';
import { Router } from '@angular/router';

declare function loadScript();
declare function destroyScript();

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  showLogo = true;

  constructor(
    public loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    loadScript();
  }

  ngOnDestroy() {
    destroyScript();
  }

  toggleLogo() {
    if (!this.showLogo) {
      setTimeout(() => {
        this.showLogo = !this.showLogo;
      }, 150);

      return;
    }

    this.showLogo = !this.showLogo;
  }

  logOut() {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure that you want to log out?',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.loginService.logOut();
        swal('Success', 'You logged out successfully!', 'success');
        this.router.navigate(['/home']);
      }
    });
  }

}
