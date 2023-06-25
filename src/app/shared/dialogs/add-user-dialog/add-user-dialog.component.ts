import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { first, Observable, Subscription } from 'rxjs';

import { User } from '../../models/user';
import { UsersQuery } from '../../state/users.query';
import { UsersService } from '../../state/users.service';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss'],
})
export class AddUserDialogComponent implements OnDestroy {
  nextId$?: Observable<number> = this.usersQuery.getNextId();

  activeOptions: { id: boolean; label: string }[] = [
    { id: true, label: 'Active' },
    { id: false, label: 'Inactive' },
  ];

  userForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    active: new FormControl(this.activeOptions[1].id, Validators.required),
  });

  private subscriptions: Subscription[] = [];

  get formValue() {
    return this.userForm.value;
  }

  constructor(
    public dialogRef: MatDialogRef<AddUserDialogComponent>,
    private usersService: UsersService,
    private usersQuery: UsersQuery,
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    this.subscriptions.push(
      this.nextId$?.pipe(first()).subscribe((nextId: number) => {
        const user: User = {
          id: nextId,
          name: this.formValue.name!,
          active: this.formValue.active!,
        };
        this.usersService.addUser(user);
        this.dialogRef.close();
      })!
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
