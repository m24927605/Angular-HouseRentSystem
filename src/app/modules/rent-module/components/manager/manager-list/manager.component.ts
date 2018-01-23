import { Component, OnInit } from '@angular/core';
import { ManagerVM } from '../view-models/manager-vm';
import { Router } from '@angular/router';
import { ManagerService } from '../manager.service';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  _loading: boolean;
  data: ManagerVM[] = [];
  pageSize = 5;
  currentPage = 1;
  total = 0;

  constructor(
    private route: Router,
    private service: ManagerService,
    private message: NzMessageService,
    private notification: NzNotificationService
  ) { }

  getData(size, current) {
    this.service.getAllManager(size, current).subscribe(
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

  pageChange(page) {
    if (this.data.length > 0) {
      this.getData(this.pageSize, page);
    }
  }

  addManager() {
    this.route.navigateByUrl('/rent/manager-action');
  }

  ngOnInit() {
    this.getData(this.pageSize, this.currentPage);
  }
}
