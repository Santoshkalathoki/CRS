import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {ApiService} from "../../apiService";
import {NgToastService} from "ng-angular-popup";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  isSubmitted: boolean = false;
  registerForm: FormGroup = new FormGroup<any>({});

  constructor(private httpClient: HttpClient,
              private formBuilder: FormBuilder,
              private router: Router,
              private apiService: ApiService,
              private toastService: NgToastService,
              private ngxToast: ToastrService) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.registerForm = this.formBuilder.group({
      name: [undefined, Validators.required],
      email: [undefined, [Validators.required, Validators.email]],
      password: [undefined, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [undefined, [Validators.required, Validators.minLength(8)]]
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      return
    } else {
      const userDetails =
        {
          name: this?.registerForm?.get('name')?.value,
          email: this?.registerForm?.get('email')?.value,
          password: this?.registerForm?.get('password')?.value
        }
        this.apiService.register(userDetails).subscribe( res => {
          this.toastService.success({detail: 'Success', summary: 'User Registration Successful', duration: 2000});
          this.ngxToast.info("User has to be approved by admin to log into the system.", "info");
          this.router.navigate(['']);
        }, error => {
          console.log(error);
          this.toastService.error({detail: 'Error', summary: 'User Registration failed', duration: 2000});
        })

    }
  }

}
