import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLinkVehicleComponent } from './dialog-link-vehicle.component';

describe('DialogLinkVehicleComponent', () => {
  let component: DialogLinkVehicleComponent;
  let fixture: ComponentFixture<DialogLinkVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogLinkVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogLinkVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
