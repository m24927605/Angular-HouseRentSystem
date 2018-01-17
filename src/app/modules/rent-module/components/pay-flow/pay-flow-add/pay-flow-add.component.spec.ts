import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayFlowAddComponent } from './pay-flow-add.component';

describe('PayFlowAddComponent', () => {
  let component: PayFlowAddComponent;
  let fixture: ComponentFixture<PayFlowAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayFlowAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayFlowAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
