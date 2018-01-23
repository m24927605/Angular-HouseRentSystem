import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerActionComponent } from './manager-action.component';

describe('ManagerActionComponent', () => {
  let component: ManagerActionComponent;
  let fixture: ComponentFixture<ManagerActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
