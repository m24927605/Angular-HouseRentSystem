import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayFlowComponent } from './pay-flow.component';

describe('PayFlowComponent', () => {
  let component: PayFlowComponent;
  let fixture: ComponentFixture<PayFlowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayFlowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
