import { AuthserviceService } from 'src/app/services/authservice.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  sidenav: any = '20';
  sidebar: any = '80';
  button: any = '15';
  timer$!: Observable<any>;
  tog: boolean = true;
  isMenuHidden = false;
  submenue: any = false;
  menus!: any[];
  path: any = 'assets/'
  subscription!: Subscription;
  user_name: any;
  currentUser: any;
  userMenu: any;
  state: any = true;
  opened: any = false;
  index: any = 0;
  form!: FormGroup;
  home: any = -1
  checked: any = true;
  status: any = 0;
  merchantId: any;
  instId!: number;
  userId!: string;
  userType!: string
  merchId!: number;
  columndata!: string;
  openHelp: any = false;
  mode: any;
  mod: any = [
    { name: 'Production', value: 'prod' },
    { name: 'Testing', value: 'test' },
  ]
  constructor(private router: Router, private authservice: AuthserviceService) { }

  ngOnInit(): void {
    this.userType = this.authservice.getUserRole();
  }
  homeClick() { }
  changeStatus(a: number) { }

  openChangePasswordModal() { }

  goToSecurity() { }

  openModalHelpUs() { }

  preventDefault(event: any) { }

  openModalWriteUs() { }

  openModalcallBack() { }
  logout() {
    console.log("logout")
    this.authservice.logout();
  }
}
