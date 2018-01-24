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
import { UserDetailVM } from '../../user-detail/view-models/user-detail-vm';
import * as filter from 'array-filter';
import * as underscore from 'underscore';

@Component({
  selector: 'app-user-detail-action',
  templateUrl: './user-detail-action.component.html',
  styleUrls: ['./user-detail-action.component.css']
})
export class UserDetailActionComponent implements OnInit {
  form: FormGroup;
  newUserDetail: UserDetailVM = new UserDetailVM();
  CalculateTypeOptions = [];
  CalculateTypeSelectedOption;
  SexOptions = [];
  SexSelectedOption;
  Params: string;
  Title: string;
  TVCostisDisabled: boolean;
  Status: boolean;
  constructor(
    private fb: FormBuilder,
    private userDetailService: UserDetailService,
    private notification: NzNotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.CalculateTypeOptions = [
      { value: 1, label: '正常繳' },
      { value: 2, label: '6個月躉繳減一個月的1/4房租' },
      { value: 3, label: '正常繳+有線電視費用' },
      { value: 4, label: '6個月躉繳減一個月的1/4房租+有線電視費用' }
    ]

    this.SexOptions = [
      { value: '男', label: '男' },
      { value: '女', label: '女' }
    ]
    let formObj = {};
    formObj = {
      UserName: [null, Validators.required],
      Sex: [null, Validators.required],
      CalculateType: [null, Validators.required],
      TVCost: [null, [this.TVCostValidator]],
      Birth: [null, [Validators.required, this.BirthValidator]],
      IDCardNo: [null, [Validators.required, this.IDCardNoValidator]],
      Phone: [null, [Validators.required, this.PhoneValidator]],
      Career: [null, Validators.required],
      Address: [null, Validators.required],
      LineID: [null, [Validators.required, this.LineIDValidator]],
      ContactUser: [null, Validators.required],
      ContactUserPhone: [null, [Validators.required, this.ContactUserPhoneValidator]],
      Status: [null],
    }
    this.form = this.fb.group(formObj);//初始化

    this.route
      .queryParams
      .subscribe(params => {
        if (params['UserID']) {
          this.Title = "編輯房客";
          this.Params = params['UserID'];
          this.getData(this.Params).subscribe((result) => {
            this.Status = !!result.Status;
            let UserSex = underscore.where(this.SexOptions, { value: result.Sex });
            let UserPayType = underscore.where(this.CalculateTypeOptions, { value: result.CalculateType });
            this.SexSelectedOption = UserSex[0];
            this.CalculateTypeSelectedOption = UserPayType[0];
            Object.keys(formObj).forEach(function (key) {
              if (key !== 'Sex' || 'CalculateType') {
                formObj[key][0] = result[key];
              }
            });
            if (result.CalculateType === 1 || result.CalculateType === 2) {
              this.form.controls['TVCost'].disable();
            }
            else {
              this.form.controls['TVCost'].enable();
            }
            this.form = this.fb.group(formObj);//將UserDetail表的資料load到form裏頭
          })
        } else {
          this.Title = "新增房客";
          this.Status = true;
        }
      });
  }

  getData(UserID) {
    return this.userDetailService.getOneUserDetail(UserID);
  }

  getFormControl(name) {
    return this.form.controls[name];
  }

  BirthValidator = (control: FormControl): any => {
    if (new Date(control.value) > new Date()) {
      return { expired: true, error: true }
    }
  };

  TVCostValidator = (control: FormControl): any => {
    if (+control.value < 0) {
      return { TVCost: true, error: true }
    }
  };

  IDCardNoValidator = (control: FormControl): any => {
    const Regex_query = /([A-Z]|[a-z])\d{9}/;
    if (!Regex_query.test(control.value)) {
      return { IDCardNoContent: true, error: true }
    }
  }

  PhoneValidator = (control: FormControl): any => {
    const Regex_query = /^09\d{2}-?\d{3}-?\d{3}$/;
    if (!Regex_query.test(control.value)) {
      return { Phone: true, error: true }
    }
  }

  ContactUserPhoneValidator = (control: FormControl): any => {
    const Regex_query = /^09\d{2}-?\d{3}-?\d{3}$/;
    if (!Regex_query.test(control.value)) {
      return { ContactUserPhone: true, error: true }
    }
  }

  LineIDValidator = (control: FormControl): any => {
    const Regex_query = /^[A-Za-z0-9]+$/;
    if (!Regex_query.test(control.value)) {
      return { LineID: true, error: true }
    }
  }

  Birth = (control: FormControl): any => {
    const Regex_query = /^(((?:19|20)[0-9]{2})[- -.](0?[1-9]|1[012])[- -.](0?[1-9]|[12][0-9]|3[01]))*$/;
    if (!Regex_query.test(control.value)) {
      return { Birth: true, error: true }
    }
  }

  isTVCostDisable(CalculateTypeSelectedOption) {
    if (CalculateTypeSelectedOption) {
      if (CalculateTypeSelectedOption.value === 1 || CalculateTypeSelectedOption.value === 2) {
        this.form.controls['TVCost'].disable();
      }
      else {
        this.form.controls['TVCost'].enable();
      }
    }
  }

  changeStatus() {
    this.Status = !this.Status;
  }

  submit(event, data: UserDetailVM) {
    if (confirm('確定要送出嗎?')) {
      data.RoomID = null;
      data.CalculateType = this.CalculateTypeSelectedOption.value;
      data.Sex = this.SexSelectedOption.value;
      data.Status = +this.Status;
      if (this.Params) {
        this.userDetailService.editUserDetail(this.Params, data).subscribe(
          res => {
            this.notification.create('success', '編輯成功', '');
            this.form.reset();
            this.router.navigateByUrl('/rent/userDetail');
          },
          err => {
            this.notification.create('error', '錯誤', err, { nzDuration: 0 });
          });
      }
      else {
        this.userDetailService.addUserDetail(data).subscribe(
          res => {
            this.notification.create('success', '新增成功', '');
            this.form.reset();
            this.router.navigateByUrl('/rent/userDetail');
          },
          err => {
            this.notification.create('error', '錯誤', err, { nzDuration: 0 });
          });
      }
    }
  }

}
