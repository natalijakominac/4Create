import { Component, OnDestroy, OnInit } from '@angular/core';

import { map, Observable, Subscription } from 'rxjs';

import { User } from './shared/models/user';
import { UsersQuery } from './shared/state/users.query';
import { UsersService } from './shared/state/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  users$: Observable<User[]> = this.usersQuery.selectAll();

  columnsData = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'active', label: 'Active' },
  ];
  data: User[] = [];

  private subscriptions: Subscription[] = [];

  get columns(): string[] {
    return this.columnsData.map((column) => column.key);
  }

  constructor(
    private usersQuery: UsersQuery,
    private usersService: UsersService
  ) {
    this.usersService.setInitialUsers([
      { id: 1, name: 'Pera', active: true },
      { id: 2, name: 'Mika', active: false },
      { id: 3, name: 'Zika', active: true },
    ]);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.users$.subscribe((users) => {
        this.data = users;
      })!
    );
  }

  toggleUserActive(user: User): void {
    this.usersService.updateUserActive(user.id, {
      ...user,
      active: !user.active,
    });
  }

  isAddUserButtonDisabled(): Observable<boolean> {
    return this.users$.pipe(
      map((users: User[]) => {
        const activeUsers = users.filter((user) => user.active);
        return activeUsers.length !== users.length || users.length >= 5;
      })
    );
  }


  openAddUserDialog(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
