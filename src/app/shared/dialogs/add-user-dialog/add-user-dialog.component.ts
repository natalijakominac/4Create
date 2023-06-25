import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss'],
})
export class AddUserDialogComponent {
  activeOptions: { id: boolean; label: string }[] = [
    { id: true, label: 'Active' },
    { id: false, label: 'Inactive' },
  ];

  userForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    active: new FormControl(this.activeOptions[1].id, Validators.required),
  });

  get formValue() {
    return this.userForm.value;
  }

  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  submit(): void { }
}
