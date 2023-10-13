import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  searchKeyWord: any;

  constructor() { }

  ngOnInit(): void {
  }

  getSearchKeyWord(searchKeyWord: any) {
    this.searchKeyWord = searchKeyWord;
  }

}
