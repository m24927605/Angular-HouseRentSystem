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
import { RentDetailService } from '../../rent-detail/rent-detail.service';
import { RentDetailVM } from '../../rent-detail/view-models/rent-detail-vm';
import { UserDetailService } from '../../user-detail/user-detail.service';
import * as underscore from 'underscore';


@Component({
  selector: 'app-rent-detail-action',
  templateUrl: './rent-detail-action.component.html',
  styleUrls: ['./rent-detail-action.component.css']
})
export class RentDetailActionComponent implements OnInit {
  form: FormGroup;
  options = [];
  selectedOption;
  Title: string;
  Params: string;
  constructor(
    private fb: FormBuilder,
    private rentDetailService: RentDetailService,
    private userDetailService: UserDetailService,
    private notification: NzNotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit() {
    //this.options=[{value:'測試','UserName':'測試'}];
    let formObj = {};
    formObj = {
      UserID: [null],
      RoomNo: [null, [Validators.required, this.RoomNoValidator]],
      RentStartDate: [null],
      RentEndDate: [null],
      PowerUnitCost: [null, [Validators.required, this.PowerUnitCostValidator]],
      RentMonthly: [null, [Validators.required, this.RentMonthlyValidator]],
      EnterDate: [null],
      LeaveDate: [null],
    };



    this.form = this.fb.group(formObj);//初始化
    this.route
      .queryParams
      .subscribe(params => {
        if (params['RoomID']) {
          this.Title = "編輯房間";
          this.Params = params['RoomID'];
          this.getData(this.Params).subscribe((result) => {
            if (result.UserID && result.UserDetails[0].Status) {
              this.options = [{ value: result.UserID, UserName: result.UserDetails[0].UserName }];
              this.selectedOption = this.options[0];
            } else {
              this.setUserNameSelect();
            }
            Object.keys(formObj).forEach(function (key) {
              formObj[key][0] = result[key];
            });
            this.form = this.fb.group(formObj);//將UserDetail表的資料load到form裏頭
          })
        } else {
          this.Title = "新增房間";
          this.setUserNameSelect();
        }
      });
  }

  setUserNameSelect() {
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
          if (!element.RentDetail) {
            tmpOptionArray.push(renamedObj);
          }
        });
        this.options = tmpOptionArray;
      },
      err => {
        this.notification.create('error', '錯誤', err, { nzDuration: 0 });
      })
  }

  getData(RoomID) {
    return this.rentDetailService.getOneRentDetail(RoomID);
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
      if (data.UserID) {
        data.UserID = this.selectedOption.value;
      }
      if (!data.EnterDate) {
        data.EnterDate = null;
      }
      if (!data.LeaveDate) {
        data.LeaveDate = null;
      }
      if (!data.RentStartDate) {
        data.RentStartDate = null;
      }
      if (!data.RentEndDate) {
        data.RentEndDate = null;
      }
      this.route
        .queryParams
        .subscribe(params => {
          let param: string = params['RoomID'];
          if (param) {
            this.rentDetailService.editRentDetail(param, data).subscribe(
              res => {
                this.notification.create('success', '編輯成功', '');
                this.form.reset();
                this.router.navigateByUrl('/rent/rentDetail');
              },
              err => {
                this.notification.create('error', '錯誤', err, { nzDuration: 0 });
              });
          } else {
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
        });
    }
  }
}
