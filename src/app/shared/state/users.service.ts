import { Injectable } from '@angular/core';

import { User } from '../models/user';
import { UsersStore } from './users.store';

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private usersStore: UsersStore) {}

  setInitialUsers(users: User[]): void {
    this.usersStore.setInitialUsers(users);
  }

  addUser(user: User): void {
    this.usersStore.add(user);
  }

  updateUserActive(userId: number, user: User): void {
    this.usersStore.update(userId, user);
  }
}
