import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../apiService";
import {NgToastService} from "ng-angular-popup";
import {LocalStorageUtil} from "../../localStorageUtil";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-my-grievance',
  templateUrl: './my-grievance.component.html',
  styleUrls: ['./my-grievance.component.css']
})
export class MyGrievanceComponent implements OnInit {

  allArticles: Array<any> = Array<any>();
  myArticles: Array<any> = Array<any>();
  userId: number = LocalStorageUtil.getStorage().id;
  isNotCollapsed: Array<boolean> = Array<boolean>();

  editArticleTitle: any;
  editArticleContent: any;
  editArticleAnonymity: any;
  articleId: any;
  isCompleted: any;
  searchKeyword = '';
  filteredArticle: any;

  editGrievance: FormGroup = new FormGroup<any>({});


  constructor(private formBuilder: FormBuilder,
              private apiService: ApiService,
              private toastr: NgToastService,
              private model: NgbModal,
              private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getMyArticles();
  }

  getMyArticles() {
    this.apiService.getAllArticles().subscribe((res: any) => {
      res.forEach((val: any) => {
        this.allArticles.push(val);
      });
      this.allArticles.filter(value => {value.author === this.userId ? this.myArticles.push(value) : ''})
      console.log(this.userId);
      console.log('my articles::::', this.myArticles);
    }, error => {
      console.log(error);
      this.toastr.success({summary: 'Error', detail: 'Error getting My Crime', duration: 2000})
    })
  }

  collapse(i: number, event: Event) {
    event.stopPropagation();
    if (!this.isNotCollapsed[i]) {
      this.isNotCollapsed[i] = true;
    } else {
      this.isNotCollapsed[i] = false;
    }
  }

  openModel(model: any, title: any, content: any, id: any, anonymity: any, completed: any) {
    this.editArticleTitle = title;
    this.editArticleContent = content;
    this.editArticleAnonymity = anonymity;
    this.articleId = id;
    this.isCompleted = completed;
    this.buildForm();
    this.model.open(model, {
      size: "lg",
      centered: true,
    });
  }

  closeModel() {
    this.model.dismissAll();
  }

  buildForm() {
    this.editGrievance = this.formBuilder.group({
      stayAnonymous: [this.editArticleAnonymity],
      title: [this.editArticleTitle],
      description: [this.editArticleContent],
    })
  }

  submit() {
    this.spinner.show();
    if (!this.isCompleted) {
      const data = {
        title: this.editGrievance?.get('title')?.value,
        content: this.editGrievance?.get('description')?.value,
        stay_anonymous: this.editGrievance?.get('stayAnonymous')?.value
      }
      this.apiService.updateArticle(this.articleId, data).subscribe({
        next: (res: any) => {
          console.log('res:::', res.detail);
          this.toastr.success({detail: 'Success', summary:'Crime Edited Successfully.', duration: 2000});
          this.spinner.hide();
          this.closeModel();
          this.allArticles = [];
          this.myArticles = [];
          this.getMyArticles();
        },
        error: (error: any) => {
          console.log('error:::',error);
          this.spinner.hide();
          this.toastr.error({detail: 'Error', summary:'Error Updating Crime.', duration: 2000});
          this.closeModel();
        }
      })
    }
  }

  delete(id: number) {
    this.apiService.deleteArticle(id).subscribe({
        next: (res: any) => {
        this.toastr.success({detail: 'Success', summary: 'Crime deleted successfully', duration: 2000});
        this.closeModel();
        this.allArticles = [];
        this.myArticles = [];
        this.getMyArticles();
        }, error: (error: any) => {
        console.log(error);
        this.toastr.error({detail: 'Error', summary: 'Failed to delete Crime', duration: 2000})
    }
    });
  }

  getSearchKeyWord(searchKeyword: any) {
    this.searchKeyword = searchKeyword;
    this.filteredArticle = this.myArticles.filter(value => value.title.toUpperCase().includes(searchKeyword.toUpperCase()));
  }

  seeAll() {
    this.searchKeyword = '';
  }

}
