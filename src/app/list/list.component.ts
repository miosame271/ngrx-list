import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromList from '../store/list.reducer';
import { Add, Remove } from '../store/list.actions';
import { User } from '../user/user.interface';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  userList$: Observable<Array<User>>;
  userList: Array<User>;

  constructor(private _listStore: Store<fromList.ListState>) {
    this.userList$ = this._listStore.pipe(select(fromList.getList));
  }

  ngOnInit() {
    this.userList$.subscribe(data => this.userList = data);
  }

  remove(user: User) {
    this._listStore.dispatch(new Remove(user));
  }
}
