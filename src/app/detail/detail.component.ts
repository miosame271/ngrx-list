import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromList from '../store/list.reducer';
import { User } from '../user/user.interface';
import { Add, Edit } from '../store/list.actions';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  action$: Observable<string>;
  action: string;

  nextId$: Observable<number>;
  user$: Observable<User>;
  user: User;

  constructor(private _listStore: Store<fromList.ListState>) {
    this.action$ = this._listStore.pipe(select(fromList.getAction));
    this.user$ = this._listStore.pipe(select(fromList.getItemById));
    this.nextId$ = this._listStore.pipe(select(fromList.getNextId));
  }

  ngOnInit() {
    this.action$.subscribe(action => {
      this.action = action;
      switch (this.action) {
        case 'add':
          this.nextId$.subscribe(id => {
            this.user = {
              id: id,
              login: '',
              name: '',
              email: ''
            };
          });
          break;

        case 'edit':
          this.user$.subscribe(user => this.user = user);
          break;
      }
    });
  }

  submit() {
    switch (this.action) {
      case 'add':
        this._listStore.dispatch(new Add(this.user));
        break;

      case 'edit':
        this._listStore.dispatch(new Edit(this.user));
        break;
    }
  }
}
