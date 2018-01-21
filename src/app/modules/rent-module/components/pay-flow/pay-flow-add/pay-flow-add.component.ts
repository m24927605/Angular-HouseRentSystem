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
  newPayFlow: addPayFlowVM = new addPayFlowVM();
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
      RoomNo: ['', [Validators.required, this.RoomNoValidator]],
      PowerQty: [0, [Validators.required, this.PowerQtyValidator]]
    });
  }

  getFormControl(name) {
    return this.form.controls[name];
  }

  RoomNoValidator = (control: FormControl): any => {
    if (!+control.value) {
      return { RoomNo: true, error: true }
    }
  }

  PowerQtyValidator = (control: FormControl): any => {
    if (!+control.value) {
      return { RoomNo: true, error: true }
    }
  }

  submit(event, data: PowerVM) {
    let roomNo = data.RoomNo;
    this.rentDetailService.getAllRentDetail(roomNo, 10, 1).subscribe(
      result => {
        this.rentDetail = result.data;
        this.newPayFlow.UserID = this.rentDetail[0].UserID;
        this.newPayFlow.CalculateType = this.rentDetail[0].UserDetails[0].CalculateType;
        this.newPayFlow.RoomNo = data.RoomNo;
        this.newPayFlow.PowerQty = data.PowerQty;
        this.newPayFlow.Payment = 0;
        this.newPayFlow.TimeOfPayment = moment().toDate();
        this.newPayFlow.RentPeriod = moment().toDate();

        if (confirm('確定要送出嗎?')) {
          this.payFlowService.addPayFlow(this.newPayFlow).subscribe(
            res => {
              this.notification.create('success', '新增成功', '');
              this.form.reset();
            },
            err => {
              this.notification.create('error', '錯誤', err, { nzDuration: 0 });
            }
          );
        }
      },
      err => {
        this.notification.create('error', '錯誤', err, { nzDuration: 0 });
      })
  }
}
