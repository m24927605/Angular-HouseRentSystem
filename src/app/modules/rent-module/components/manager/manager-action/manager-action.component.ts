import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from '@angular/forms';
import { ManagerVM } from '../view-models/manager-vm';
import { ManagerService } from '../manager.service';
import { NzNotificationService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manager-action',
  templateUrl: './manager-action.component.html',
  styleUrls: ['./manager-action.component.css']
})
export class ManagerActionComponent implements OnInit {
  form: FormGroup;
  Params: string;
  Title: string;
  constructor(
    private fb: FormBuilder,
    private service: ManagerService,
    private notification: NzNotificationService,
    private router: Router,
    private route: ActivatedRoute

  ) { }
  ngOnInit() {

    let formObj = {
      Account: [null, [Validators.required]],
      Password: [null, [Validators.required]],
      CheckPassword: [null, [Validators.required, this.confirmationValidator]],
      Name: [null, [Validators.required]]
    };

    this.form = this.fb.group(formObj);

    this.route
      .queryParams
      .subscribe(params => {
        this.Params = params['BackerID'];
        if (this.Params) {
          this.Title = "修改密碼";
          this.getData(this.Params).subscribe((result) => {
            Object.keys(formObj).forEach(function (key) {
              if (key !== 'Password') {
                formObj[key][0] = result[key];
              }
            });
            this.form = this.fb.group(formObj);//將Manager表的資料load到form裏頭
          })
        } else {
          this.Title = "新增管理員";
        }
      });
  }

  getData(BackerID) {
    return this.service.getOneManager(BackerID);
  }


  updateConfirmValidator() {
    /** wait for refresh value */
    setTimeout(_ => {
      this.form.controls['CheckPassword'].updateValueAndValidity();
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.form.controls['Password'].value) {
      return { confirm: true, error: true };
    }
  };


  getFormControl(name) {
    return this.form.controls[name];
  }

  submit(event, data: ManagerVM) {
    if (confirm('確定要送出嗎?')) {
      if (this.Params) {
        this.service.editManager(this.Params, data).subscribe(
          res => {
            this.notification.create('success', '編輯成功', '');
            this.form.reset();
            this.router.navigateByUrl('/rent/manager');
          },
          err => {
            this.notification.create('error', '錯誤', err, { nzDuration: 0 });
          });
      }
      else {
        data.Role = 1;
        this.service.addManager(data).subscribe(
          res => {
            this.notification.create('success', '新增成功', '');
            this.form.reset();
            this.router.navigateByUrl('/rent/manager');
          },
          err => {
            this.notification.create('error', '錯誤', err, { nzDuration: 0 });
          });
      }
    }
  }

}
