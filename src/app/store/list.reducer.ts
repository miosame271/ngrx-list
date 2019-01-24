import { createSelector } from '@ngrx/store';

import * as fromRouter from '../store/custom-router.reducer';
import { ListActionTypes } from './list.actions';
import { User } from '../user/user.interface';

export interface ListAction {
  type: string;
  payload?: User;
}

export interface ListState {
  list: Array<User>;
}

export const initialState: ListState = {
  list: [
    {
      id: 1,
      login: 'TeeTeeBee',
      name: 'Taura Bennett',
      email: 'taura.b@gmail.com'
    },
    {
      id: 2,
      login: 'Ample_Muffin',
      name: 'Laurie Matthews',
      email: 'Laurie.M@gmail.com'
    },
    {
      id: 3,
      login: 'MalodorousMaxine',
      name: 'Maxine Gonzales',
      email: 'Maxine.G@gmail.com'
    },
    {
      id: 4,
      login: 'christophinator',
      name: 'Mike Christopher Harris',
      email: 'M.C.Harris@gmail.com'
    },
    {
      id: 5,
      login: 'AwesomeAlvin',
      name: 'Alvin Wagner',
      email: 'Alvin.Wagner@gmail.com'
    },
    {
      id: 6,
      login: 'mrsgreen',
      name: 'Kristy Green',
      email: 'mrsgreen@gmail.com'
    },
    {
      id: 7,
      login: 'Juankitten',
      name: 'Thea Jackson',
      email: 'Th.Jackson@gmail.com'
    },
    {
      id: 8,
      login: 'KayDoubleYouEm',
      name: 'Wilhelmina Mcdonald',
      email: 'W.Mcdonald@gmail.com'
    }
  ]
};

export const selectList = (state: ListState) => state.list;

export const getList = createSelector(
  // @ts-ignore
  selectList,
  // @ts-ignore
  (state: ListState) => {
    return state.list;
  }
);

export const getItemById = createSelector(
  getList,
  fromRouter.getRouterState,
  (list: Array<User>, routerState) => {
    if (list && list.length && routerState.state.params && routerState.state.params.id) {
      return list.filter(item => item.id === +routerState.state.params.id)[0];
    } else {
      return null;
    }
  }
);

export const getNextId = createSelector(
  getList,
  (list: Array<User>) => {
    if (list && list.length) {
      return list.map(item => item.id).reduce(function (max, current) {
        return max >= current ? max : current;
      }) + 1;
    } else {
      return 1;
    }
  }
);


export const getAction = createSelector(
  fromRouter.getRouterState,
  (routerState) => {
    return routerState.state.url.split('/')[1];
  }
);

export function listReducer(state: ListState = initialState, action: ListAction) {
  switch (action.type) {
    case ListActionTypes.Add:
      return {
        ...state,
        list: [...state.list, action.payload]
      };

    case ListActionTypes.Edit:
      return {
        ...state,
        list: state.list.map(item => item.id === action.payload.id ? action.payload : item)
      };

    case ListActionTypes.Remove:
      return {
        ...state,
        list: state.list.filter(item => item.id !== action.payload.id)
      };

    default:
      return state;
  }
}
