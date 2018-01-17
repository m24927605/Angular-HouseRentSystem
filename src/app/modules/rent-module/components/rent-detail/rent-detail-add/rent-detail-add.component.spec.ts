import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentDetailAddComponent } from './rent-detail-add.component';

describe('RentDetailAddComponent', () => {
  let component: RentDetailAddComponent;
  let fixture: ComponentFixture<RentDetailAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentDetailAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentDetailAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
