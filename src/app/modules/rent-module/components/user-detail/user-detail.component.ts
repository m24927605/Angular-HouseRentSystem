import { Component, OnInit } from '@angular/core';
import { UserDetailVM } from './view-models/user-detail-vm';
import { UserDetailService } from './user-detail.service';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  _loading: boolean;
  inputValue: string = '';
  data: UserDetailVM[] = [];
  pageSize = 10;
  currentPage = 1;
  total = 0;

  constructor(
    private service: UserDetailService,
    private message: NzMessageService,
    private notification: NzNotificationService
  ) { }

  getData(input, size, current) {
    this.service.getAllUserDetail(input, size, current).subscribe(
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
