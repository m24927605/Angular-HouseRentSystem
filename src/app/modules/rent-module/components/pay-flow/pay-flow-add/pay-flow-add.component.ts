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
import { Router, ActivatedRoute } from '@angular/router';
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
  rentDetail: RentDetailVM[];
  UserID: number;
  RoomNo: string;
  RoomID: number;
  pastPowerQty: number;
  constructor(
    private fb: FormBuilder,
    private payFlowService: PayFlowService,
    private rentDetailService: RentDetailService,
    private notification: NzNotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      RoomNo: ['', [Validators.required, this.RoomNoValidator]],
      PowerQty: [null, [Validators.required, this.PowerQtyValidator]]
    });

    this.route
      .queryParams
      .subscribe(params => {
        this.UserID = params['UserID'];
        this.RoomNo = params['RoomNo'];
        this.RoomID = params['RoomID'];
        if (this.UserID) {
          this.payFlowService.getAllPayFlowNoPage(this.UserID).subscribe(result => {
            if (result.length > 0) {
              this.pastPowerQty = result[result.length - 1].PowerQty;
            }
            else {
              this.pastPowerQty = 0;
            }
          })
        } else {
          this.notification.create('error', '錯誤', "尚未有房客入住", { nzDuration: 0 });
          this.router.navigateByUrl('/rent/rentDetail');
        }
      })
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
    if (+control.value < 0) {
      return { PowerQty: true, error: true }
    }
  }

  submit(event, data: PowerVM) {
    let roomNo = data.RoomNo;
    let roomID = this.RoomID;
    this.rentDetailService.getAllRentNoPage(roomID).subscribe(
      result => {
        if (!result) {
          this.notification.create('error', '錯誤', "無此房間", { nzDuration: 0 });
        }
        if (result[0].UserDetails.length === 0) {
          this.notification.create('error', '錯誤', "尚未有房客入住", { nzDuration: 0 });
        }
        else {
          this.rentDetail = result;
          this.newPayFlow.UserID = this.UserID;
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
                this.router.navigateByUrl('/rent/rentDetail');
              },
              err => {
                this.notification.create('error', '錯誤', err, { nzDuration: 0 });
              }
            );
          }
        }
      },
      err => {
        this.notification.create('error', '錯誤', err, { nzDuration: 0 });
      })
  }
}
