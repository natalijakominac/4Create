import { Injectable } from '@angular/core';

import { QueryEntity } from '@datorama/akita';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UsersState, UsersStore } from './users.store';

@Injectable({
  providedIn: 'root',
})
export class UsersQuery extends QueryEntity<UsersState> {
  constructor(protected override store: UsersStore) {
    super(store);
  }

  getNextId(): Observable<number> {
    return this.selectAll().pipe(
      map((users) => Math.max(...users.map((user) => user.id)) + 1)
    );
  }
}
