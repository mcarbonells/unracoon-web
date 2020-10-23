import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUser, faWindowClose } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faFont } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];
  faUser = faUser;
  faCheck = faCheck;
  faFont = faFont;
  faUsers = faUsers;
  faInfoCircle = faInfoCircle;
  faClose = faWindowClose;


  constructor( public router: Router, ) {  }

  ngOnInit(): void {
  }

  logOut() {
    localStorage.removeItem('user');
  }

}
