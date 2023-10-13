import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {LocalStorageUtil} from "../../localStorageUtil";
import {ApiService} from "../../apiService";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";

@Component({
  selector: 'app-post-grievance',
  templateUrl: './post-grievance.component.html',
  styleUrls: ['./post-grievance.component.css']
})
export class PostGrievanceComponent implements OnInit {

  postGrievance: FormGroup = new FormGroup<any>({});
  isSubmitted: boolean = false;

  constructor(private formBuilder: FormBuilder,
              private  apiService: ApiService,
              private toastr: NgToastService,
              private route: Router) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.postGrievance = this.formBuilder.group({
      stayAnonymous: [false],
      title: [undefined, Validators.required],
      description: [undefined, Validators.required]
    });
  }

  submit() {
    this.isSubmitted = true;
    if (this.postGrievance.invalid) {
      return;
    } else {
      const article =
      {
        title: this.postGrievance.get('title')?.value,
        content: this.postGrievance.get('description')?.value,
        author: LocalStorageUtil.getStorage().id,
        stay_anonymous: this.postGrievance.get('stayAnonymous')?.value
      }
      this.apiService.postArticle(article).subscribe(res => {
        this.toastr.success({detail: 'Success', summary: 'Crime Reported Successfully.', duration: 2000});
        this.postGrievance.get('title')?.patchValue(null);
        this.postGrievance.get('description')?.patchValue(null);
        this.isSubmitted = false;
        this.route.navigate(['/dashboard']);
      }, error => {
        console.log(error);
        this.toastr.error({detail: 'Error', summary: 'Crime reporting Failed', duration: 2000})
      });

    }
  }

}
