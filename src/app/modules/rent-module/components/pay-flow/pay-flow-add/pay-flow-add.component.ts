import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router } from '@angular/router';
import { PayFlowService } from '../pay-flow.service';
import { RentDetailService } from '../../rent-detail/rent-detail.service';
import { PowerVM } from '../view-models/power-vm';
import { RentDetailVM } from '../../rent-detail/view-models/rent-detail-vm';
import { addPayFlowVM } from '../view-models/pay-flow-add-vm';

@Component({
  selector: 'app-pay-flow-add',
  templateUrl: './pay-flow-add.component.html',
  styleUrls: ['./pay-flow-add.component.css']
})
export class PayFlowAddComponent implements OnInit {
  form: FormGroup;
  newPayFlow: addPayFlowVM;
  rentDetail: RentDetailVM[] = [];
  constructor(
    private fb: FormBuilder,
    private payFlowService: PayFlowService,
    private rentDetailService: RentDetailService,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      RoomNo: ['', Validators.required],
      PowerQty: [0, Validators.required]
    });
  }

  submit(event, data: PowerVM) {
    let roomNo = data.RoomNo;
    this.rentDetailService.getAllRentDetail(roomNo, 10, 1).subscribe(
      result => {
        this.rentDetail = result.data;
        let newObj: any = {};
        newObj.UserID = this.rentDetail[0].UserID;
        newObj.RoomNo = data.RoomNo;
        newObj.PowerQty = data.PowerQty;
        newObj.Payment = 0;
        newObj.TimeOfPayment = moment().toDate();
        newObj.RentPeriod = moment().toDate()

        if (confirm('確定要送出嗎?')) {
          this.payFlowService.addPayFlow(newObj).subscribe(
            res => {
              this.notification.create('success', '新增成功', '');
              this.router.navigateByUrl('channel');
            },
            err => {
              this.notification.create('error', '錯誤', err, { nzDuration: 0 });
            }
          );
        }
      },
      err => {
        this.notification.create('error', '錯誤', err, { nzDuration: 0 });
      }
    )
  }
}
