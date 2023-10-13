import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../apiService";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-approval-request',
  templateUrl: './approval-request.component.html',
  styleUrls: ['./approval-request.component.css']
})
export class ApprovalRequestComponent implements OnInit {

  approvalPendingUsers: any
  p: number = 1;

  constructor(private apiService: ApiService,
              private toastr: NgToastService) { }

  ngOnInit(): void {
    this.getApprovalPendingUsers();
  }

  getApprovalPendingUsers() {
    this.apiService.getApprovalPendingUsers().subscribe(res => {
      this.approvalPendingUsers = res;
      console.log(res);
    }, error => {
      console.log(error);
    })
  }

  approveUser(id: number) {
    const userId =
      {
        user_id: id
      }
    this.apiService.approveUser(userId).subscribe(res => {
      this.toastr.success({detail: 'Success', summary: 'User Approved', duration: 2000});
      this.getApprovalPendingUsers();
    }, error => {
      this.toastr.error({detail: 'Error', summary: 'Could not approve user', duration: 2000});
    })
  }

}
