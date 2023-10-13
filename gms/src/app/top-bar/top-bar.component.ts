import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {LocalStorageUtil} from "../../localStorageUtil";
import {NgToastService} from "ng-angular-popup";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})

export class TopBarComponent implements OnInit {
  @Input() hasArticle: boolean = false;
  @Output() getSearchKeyWord: EventEmitter<any> = new EventEmitter<any>();
  currentUser!: string;
  isAdmin!: boolean;

  searchForm: FormGroup = new FormGroup<any>({});

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private toastService: NgToastService) { }

  ngOnInit(): void {
    this.buildForm();
    this.currentUser = LocalStorageUtil.getStorage().name;
    this.isAdmin = LocalStorageUtil.getStorage().is_admin;
  }

  /*signOut() {
    LocalStorageUtil.clearStorage()
    this.router.navigate(['']);
    this.toastService.success({detail: 'success', summary: 'Logged out successfully', duration: 2000});
  }*/

  search() {
    this.getSearchKeyWord.emit(this.searchForm.get('searchKeyWord')?.value);
  }

  buildForm() {
    this.searchForm = this.formBuilder.group({
      searchKeyWord: [undefined]
    })
  }

}
