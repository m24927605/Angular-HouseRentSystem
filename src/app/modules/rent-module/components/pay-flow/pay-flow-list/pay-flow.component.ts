import { Component, OnInit } from '@angular/core';
import { PayFlowVM } from '../view-models/pay-flow-vm';
import { NzMessageService, NzNotificationService, NzModalService } from 'ng-zorro-antd';
import { PayFlowService } from '../pay-flow.service';
import { ActivatedRoute } from '@angular/router';
import { UserDetailService } from '../../user-detail/user-detail.service';

@Component({
  selector: 'app-pay-flow',
  templateUrl: './pay-flow.component.html',
  styleUrls: ['./pay-flow.component.css']
})
export class PayFlowComponent implements OnInit {
  _loading: boolean;
  searchType: string = '';
  inputValue: string = '';
  data: PayFlowVM[] = [];
  pageSize = 10;
  currentPage = 1;
  total = 0;

  constructor(
    private payFlowService: PayFlowService,
    private userDetailService: UserDetailService,
    private message: NzMessageService,
    private notification: NzNotificationService,
    private route: ActivatedRoute,
    private confirmServ: NzModalService
  ) { }

  showConfirm = (ID) => {
    let willPayFlow: any = this.data[ID - 1];
    let that = this;
    this.confirmServ.confirm({
      title: '確認繳費',
      content: `<b>房客 ${willPayFlow.UserName} 需繳 ${willPayFlow.Payment}元</b>`,
      onOk() {
        that.payMoney(ID);
      },
      onCancel() {
      }
    });
  }
  getData(size, current, searchType, input) {
    this.payFlowService.getAllPayFlow(size, current, searchType, input).subscribe(
      result => {
        this.data = result.data;
        this.pageSize = +result.size;
        this.currentPage = +result.current;
        this.total = +result.total;
        this._loading = false;
        this.inputValue = '';
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
    this.searchType = 'RoomNo';
    this.getData(this.pageSize, 1, this.searchType, this.inputValue);
    this.searchType = '';
  }

  pageChange(page) {
    if (this.data.length > 0) {
      this.getData(this.pageSize, page, this.searchType, this.inputValue);
    }
  }

  payMoney(ID) {
    let data: any = {};
    this.payFlowService.updatePayFlow(data, ID).subscribe(
      res => {
        this.notification.create('success', '繳費成功', '');
        this.getData(this.pageSize, this.currentPage, this.searchType, this.inputValue, );
      },
      err => {
        this.notification.create('error', '錯誤', err, { nzDuration: 0 });
      }
    );
  }

  ngOnInit() {
    const id = this.message.loading('加載資料中', {nzDuration: 0}).messageId;
    this.route
      .queryParams
      .subscribe(params => {
        if (params['UserID']) {
          this.inputValue = params['UserID'];
          this.searchType = 'UserID';
        }
        if (params['RoomNo']) {
          this.inputValue = params['RoomNo'];
          this.searchType = 'RoomNo';
        }
        if (this.inputValue && this.searchType) {
          this.getData(this.pageSize, this.currentPage, this.searchType, this.inputValue, );
        }
        if (!this.inputValue) {
          this.searchType = '';
        }
        this.getData(this.pageSize, this.currentPage, this.searchType, this.inputValue, );
        this.message.remove(id);
      });
  }
}
