import { Action } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export enum UserActionTypes {
    GetUser = '[User] Get User',
    Authenticated = '[User] Authenticated',
    NotAuthenticated = '[User] Not Authenticated',
    AuthError = '[User] Auth Error',
    Logout = '[User] Logout'
}

export class GetUser implements Action {
    readonly type = UserActionTypes.GetUser;
}

export class Authenticated implements Action {
  readonly type = UserActionTypes.Authenticated;
  constructor(public payload: User) {}
}

export class NotAuthenticated implements Action {
  readonly type = UserActionTypes.NotAuthenticated;
}

export class Logout implements Action {
    readonly type = UserActionTypes.Logout;
}

export class AuthError implements Action {
  readonly type = UserActionTypes.AuthError;
  constructor(public payload?: any) {}
}

export type All = GetUser
| Authenticated
| NotAuthenticated
| AuthError
| Logout;
