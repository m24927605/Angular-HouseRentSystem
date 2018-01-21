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
import { RentDetailService } from '../../rent-detail/rent-detail.service';
import { RentDetailVM } from '../../rent-detail/view-models/rent-detail-vm';
import { UserDetailService } from '../../user-detail/user-detail.service';

@Component({
  selector: 'app-rent-detail-action',
  templateUrl: './rent-detail-action.component.html',
  styleUrls: ['./rent-detail-action.component.css']
})
export class RentDetailActionComponent implements OnInit {
  form: FormGroup;
  options = [];
  selectedOption;
  constructor(
    private fb: FormBuilder,
    private rentDetailService: RentDetailService,
    private userDetailService: UserDetailService,
    private notification: NzNotificationService,
    private router: Router) { }


  ngOnInit() {

    function renameKeys(obj, newKeys) {
      const keyValues = Object.keys(obj).map(key => {
        const newKey = newKeys[key] || key;
        return { [newKey]: obj[key] };
      });
      return Object.assign({}, ...keyValues);
    }

    this.userDetailService.getAllUserDetailNoPage().subscribe(
      result => {
        let oldArray: any = [];
        oldArray = result;
        let tmpOptionArray: any = [];
        oldArray.forEach(function (element) {
          const newKeys = { UserID: "value" };
          let renamedObj = renameKeys(element, newKeys);
          tmpOptionArray.push(renamedObj);
        });
        this.options = tmpOptionArray;
      },
      err => {
        this.notification.create('error', '錯誤', err, { nzDuration: 0 });
      }
    )

    this.form = this.fb.group({
      UserID: [null, Validators.required],
      RoomNo: [null, [Validators.required, this.RoomNoValidator]],
      RentStartDate: [null, [Validators.required]],
      RentEndDate: [null, [Validators.required]],
      PowerUnitCost: [null, [Validators.required, this.PowerUnitCostValidator]],
      RentMonthly: [null, [Validators.required, this.RentMonthlyValidator]],
      EnterDate: [null, [Validators.required]],
      LeaveDate: [null, [Validators.required]],
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

  PowerUnitCostValidator = (control: FormControl): any => {
    if (+control.value === 0 || +control.value < 0) {
      return { PowerUnitCost: true, error: true }
    }
  };

  RentMonthlyValidator = (control: FormControl): any => {
    if (+control.value === 0 || +control.value < 0) {
      return { RentMonthly: true, error: true }
    }
  };

  submit(event, data: RentDetailVM) {

    if (confirm('確定要送出嗎?')) {
      data.UserID = this.selectedOption.value;
      this.rentDetailService.addRentDetail(data).subscribe(
        res => {
          this.notification.create('success', '新增成功', '');
          this.form.reset();
          this.router.navigateByUrl('/rent/rentDetail');
        },
        err => {
          this.notification.create('error', '錯誤', err, { nzDuration: 0 });
        });
    }
  }
}
