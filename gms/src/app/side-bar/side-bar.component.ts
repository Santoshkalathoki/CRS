import { Component, OnInit } from '@angular/core';
import {LocalStorageUtil} from "../../localStorageUtil";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {ApiService} from "../../apiService";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  isAdmin: boolean = false;

  constructor(private router: Router,
              private toastr: NgToastService,
              private apiService: ApiService) { }

  ngOnInit(): void {
    if (LocalStorageUtil.getStorage().is_admin) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
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
