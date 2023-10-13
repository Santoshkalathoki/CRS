import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../apiService";
import {NgbModal, NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  articles: Array<any> = new Array<any>();
  p: number = 1;
  articlesCount: number = 0;
  totalUsersCount: number = 0;
  pendingUsersCount: number = 0;

  openedArticleTitle: any;
  openedArticleContent: any;
  openedArticleStatus: any;
  openedArticleId: any;

  constructor(private apiService: ApiService,
              private model: NgbModal,
              private toastService: NgToastService) { }

  ngOnInit(): void {
    this.getArticles();
    this.getArticlesCount();
  }

  getArticles() {
    this.apiService.getAllArticles().subscribe( (res: any) => {
      res.forEach((v: any) => {
        this.articles.push(v);
      })
      // this.articles = res.detail;
      console.log(res);
    }, error => {
      console.log(error);
    });
  }

  getArticlesCount() {
    this.getTotalUsersCount();
    this.apiService.getArticles().subscribe((res: any) => {
      this.articlesCount = res.length;
    }, error => {
      console.log(error);
    });
  }

  getTotalUsersCount() {
    this.getPendingUsersCount();
    this.apiService.getAllUsers().subscribe((res: any) => {
      this.totalUsersCount = res.length;
    }, error => {
      console.log(error);
    });
  }

  getPendingUsersCount() {
    this.apiService.getApprovalPendingUsers().subscribe((res: any) => {
      this.pendingUsersCount = res.length;
    }, error => {
      console.log(error);
    });
  }

  openModel(model: any, title: any, content: any, status: any, id: any){
    this.openedArticleTitle = title;
    this.openedArticleContent = content;
    this.openedArticleStatus = status ? 'Completed' : 'Pending';
    this.openedArticleId = id;
    this.model.open(model, {
      size: "lg",
      animation: true,
      centered: true
    });
  }

  close() {
    this.model.dismissAll();
  }

  completeArticle = (id: number) => {
    const data =
      {
        is_completed: true
      }
    this.apiService.completeArticle(id, data).subscribe(res => {
      this.close();
      this.articles = new Array<any>();
      this.getArticles();
      this.getArticlesCount();
      this.toastService.success({detail: 'Success', summary: 'Successfully changed the article status', duration: 2000});
    }, error => {
      console.log(error);
      this.toastService.error({detail: 'Error', summary: 'Error changing article status.', duration: 2000});
    })
  }
}
