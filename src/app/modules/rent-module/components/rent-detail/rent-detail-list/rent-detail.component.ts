import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RentDetailService } from '../rent-detail.service';
import { NzNotificationService, NzMessageService } from 'ng-zorro-antd';
import { RentDetailVM } from '../view-models/rent-detail-vm';

@Component({
  selector: 'app-rent-detail',
  templateUrl: './rent-detail.component.html',
  styleUrls: ['./rent-detail.component.css']
})
export class RentDetailComponent implements OnInit {
  _loading: boolean;
  inputValue: string = '';
  data: RentDetailVM[] = [];
  pageSize = 10;
  currentPage = 1;
  total = 0;

  constructor(
    private service: RentDetailService,
    private message: NzMessageService,
    private notification: NzNotificationService
  ) { }

  getData(input, size, current) {
    this.service.getAllRentDetail(input, size, current).subscribe(
      result => {
        this.data = result.data;
        this.pageSize = +result.size;
        this.currentPage = +result.current;
        this.total = +result.total;
        this._loading = false;
      },
      err => {
        this.notification.create('error', '錯誤', err, { nzDuration: 0 });
      }
    )
  }

  search() {
    let isEmpty = Object.keys(this.inputValue)
      .map(x => this.inputValue[x].trim())
      .every(x => !Boolean(x));
    if (isEmpty) {
      return this.message.error('請輸入搜尋條件!');
    }
    this._loading = true;
    this.getData(this.inputValue, this.pageSize, 1);
  }

  pageChange(page) {
    if (this.data.length > 0) {
      this.getData(this.inputValue, this.pageSize, page);
    }
  }

  ngOnInit() {
    this.getData(this.inputValue, this.pageSize, this.currentPage);
  }
}
