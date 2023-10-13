import { Component, OnInit } from '@angular/core';
import {LocalStorageUtil} from "../../localStorageUtil";
import {ApiService} from "../../apiService";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  name = LocalStorageUtil.getStorage().name;
  email = LocalStorageUtil.getStorage().email;
  userType = LocalStorageUtil.getStorage().is_admin ? 'Admin' : 'User';

  constructor(private apiService: ApiService,
              private toastr: NgToastService,
              private router: Router) { }

  ngOnInit(): void {
    console.log(LocalStorageUtil.getStorage());
  }

  signOut() {
    LocalStorageUtil.clearStorage();
    this.apiService.logout().subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
    this.router.navigate(['']);
    this.toastr.success({summary: 'Success', detail: 'Logged Out Successfully', duration: 2000})
  }

}
