import { Action } from '@ngrx/store';
import { User } from '../user/user.interface';

export enum ListActionTypes {
  Add = '[List] Add',
  Edit = '[List] Edit',
  Remove = '[List] Remove'
}

export class Add implements Action {
  readonly type = ListActionTypes.Add;

  constructor(public payload: User) {
  }
}

export class Edit implements Action {
  readonly type = ListActionTypes.Edit;

  constructor(public payload: User) {
  }
}

export class Remove implements Action {
  readonly type = ListActionTypes.Remove;

  constructor(public payload: User) {
  }
}
