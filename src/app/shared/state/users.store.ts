import { Injectable } from '@angular/core';

import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

import { User } from '../models/user';

export interface UsersState extends EntityState<User> {}

export function createInitialState(): UsersState {
  return {
    users: [],
  };
}

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'users' })
export class UsersStore extends EntityStore<UsersState> {
  constructor() {
    super(createInitialState());
  }

  setInitialUsers(users: User[]) {
    this.set(users);
    this.update((state) => ({
      ...state,
    }));
  }
}
