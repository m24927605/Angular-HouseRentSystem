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
import { UserDetailVM } from '../../user-detail/view-models/user-detail-vm';


@Component({
  selector: 'app-user-detail-action',
  templateUrl: './user-detail-action.component.html',
  styleUrls: ['./user-detail-action.component.css']
})
export class UserDetailActionComponent implements OnInit {
  form: FormGroup;
  newUserDetail: UserDetailVM = new UserDetailVM();
  options = [];
  selectedOption;
  constructor(
    private fb: FormBuilder,
    private userDetailService: UserDetailService,
    private notification: NzNotificationService,
    private router: Router) { }

  ngOnInit() {

    this.options = [
      { value: '男', label: '男' },
      { value: '女', label: '女' }
    ]

    this.form = this.fb.group({
      UserName: [null, Validators.required],
      Sex: [null, Validators.required],
      CalculateType: [null, Validators.required],
      TVCost: [null, Validators.required],
      Birth: [null, Validators.required],
      IDCardNo: [null, Validators.required],
      Phone: [null, Validators.required],
      Career: [null, Validators.required],
      Address: [null, Validators.required],
      Email: [null, Validators.required],
      LineID: [null, Validators.required],
      ContactUser: [null, Validators.required],
      ContactUserPhone: [null, Validators.required],
    });
  }

  getFormControl(name) {
    return this.form.controls[name];
  }

  BirthValidator = (control: FormControl): any => {
    if (new Date(control.value) > new Date()) {
      return { expired: true, error: true }
    }
  };

  submit(event, data: UserDetailVM) {
    if (confirm('確定要送出嗎?')) {
      data.RoomID = null;
      data.Sex = this.selectedOption.value;
      this.userDetailService.addUserDetail(data).subscribe(
        res => {
          this.notification.create('success', '新增成功', '');
          this.form.reset();
        },
        err => {
          this.notification.create('error', '錯誤', err, { nzDuration: 0 });
        });
    }
  }

}
