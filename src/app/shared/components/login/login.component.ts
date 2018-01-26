import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authServive: AuthService,
    private route: Router,
    private notification: NzNotificationService
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      Account: [null, [Validators.required]],
      Password: [null, [Validators.required]],
    });
  }

  submit(event, data) {
    for (const i in this.form.controls) {
      if (this.form.controls[i]) {
        this.form.controls[i].markAsDirty();
      }
    }
    if (this.form.valid) {
      this.authServive.login(data).subscribe(res => {
        if (res.result) {
          this.route.navigateByUrl('/');
        }
      },
        err => {
          this.notification.create('error', '錯誤', err, { nzDuration: 0 });
        })
    }
  }
}
