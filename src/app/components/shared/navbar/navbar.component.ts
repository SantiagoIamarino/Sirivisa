import { Component, OnInit, Input } from '@angular/core';

declare function slideMobileNavbar();

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Input() transparent =  true;

  constructor() { }

  ngOnInit() {
  }

  navbarToggle() {
    slideMobileNavbar();
  }

}
