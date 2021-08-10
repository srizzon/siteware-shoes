import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-link-vehicle',
  templateUrl: './dialog-link-vehicle.component.html',
  styleUrls: ['./dialog-link-vehicle.component.scss']
})
export class DialogLinkVehicleComponent implements OnInit {

  vehicleForm: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<DialogLinkVehicleComponent>,
    private _formBuider: FormBuilder
  ) { }

  ngOnInit(): void {
    this.vehicleForm = this._formBuider.group(
      {
        vehicleControl: ['']
      }
    )
  }

  selectInstructor(): void {
    this._dialogRef.close(this.vehicleForm.get('vehicleControl').value);
  }

}
