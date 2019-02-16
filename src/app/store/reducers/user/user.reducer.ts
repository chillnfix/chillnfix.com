import { Action, createSelector, createFeatureSelector } from '@ngrx/store';

import * as userActions from '../../actions/user/user.actions';
import { User, IUser } from 'src/app/models/user.model';


export interface UserState {
  user: IUser;
}

export const initialState: UserState = {
  user: new User('', 'Guest', '')
};

export function reducer(state = initialState, action: userActions.All): UserState {
  switch (action.type) {
    case userActions.UserActionTypes.Authenticated:
      return {
        ...state,
        user: action.payload
      };
    case userActions.UserActionTypes.NotAuthenticated:
      return {
        ...state,
        ...initialState
      };
      case userActions.UserActionTypes.Logout:
        return {
          ...state,
          ...initialState
        };
    default:
      return state;
  }
}

export const getUserState = createFeatureSelector<UserState>(
  'user'
);

export const selectUser = createSelector(
  getUserState,
  (state: UserState) => {
    return state.user;
  }
);

export const selectIsUserLoggedIn = createSelector(
  selectUser,
  (user) => {
    return !!user.uid;
  }
);
