import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CfcVehicleComponent } from './cfc-vehicle.component';

describe('CfcVehicleComponent', () => {
  let component: CfcVehicleComponent;
  let fixture: ComponentFixture<CfcVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CfcVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CfcVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
