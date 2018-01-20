import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailActionComponent } from './user-detail-action.component';

describe('UserDetailActionComponent', () => {
  let component: UserDetailActionComponent;
  let fixture: ComponentFixture<UserDetailActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
