import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../apiService";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import {NgxSpinnerModule, NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPassword: FormGroup = new FormGroup<any>({});
  isSubmitted: boolean = false;
  isSubmittedSecond: boolean = false;
  sentVerificationCode: boolean = false;
  submitCount: number = 0;

  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private toastr: NgToastService,
              private router: Router,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.forgotPassword = this.formBuilder.group({
      email: [undefined, [Validators.required, Validators.email]],
      verificationCode: [''],
      newPassword: ['']
    });
  }

  submit() {
    this.submitCount += 1;
    this.isSubmitted = false;
    if (this.submitCount > 1) {
      this.isSubmittedSecond = true;
    }
    if (this.forgotPassword.invalid) {
      return;
    } else {
      if (this.sentVerificationCode) {
        const resetData =
          {
            verification_code: this.forgotPassword?.get('verificationCode')?.value,
            email: this.forgotPassword?.get('email')?.value,
            new_password: this.forgotPassword?.get('newPassword')?.value
          }
          this.apiService.resetPassword(resetData).subscribe(res=> {
            this.toastr.success({detail:'Success', summary: 'Password reset successful', duration: 2000});
            this.router.navigate(['/'])
          }, error => {
            this.toastr.error({detail: 'Error', summary: 'Error resetting password', duration: 2000})
          })
      } else {
        const emailData =
          {
            email: this.forgotPassword?.get('email')?.value
          }
        this.spinner.show();
        this.apiService.forgotPassword(emailData).subscribe(res=> {
          this.spinner.hide();
          this.sentVerificationCode = true;
          this.toastr.success({detail: 'Success', summary: 'Verification code sent to submitted email', duration: 3000});
          this.forgotPassword.get('verificationCode')?.addValidators(Validators.required);
          this.forgotPassword.get('newPassword')?.addValidators([Validators.required, Validators.minLength(8)]);
        }, error => {
          this.spinner.hide();
          this.toastr.error({detail: 'Error', summary: 'Error sending verification code', duration: 2000})
        });
      }
    }
  }

}
