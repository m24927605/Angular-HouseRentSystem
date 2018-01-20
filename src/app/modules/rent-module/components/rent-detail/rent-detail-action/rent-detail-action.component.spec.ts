import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentDetailActionComponent } from './rent-detail-action.component';

describe('RentDetailActionComponent', () => {
  let component: RentDetailActionComponent;
  let fixture: ComponentFixture<RentDetailActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentDetailActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentDetailActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
