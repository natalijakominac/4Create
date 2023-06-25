import { Injectable } from '@angular/core';

import { QueryEntity } from '@datorama/akita';

import { UsersState, UsersStore } from './users.store';

@Injectable({
  providedIn: 'root',
})
export class UsersQuery extends QueryEntity<UsersState> {
  constructor(protected override store: UsersStore) {
    super(store);
  }
}
