import { Action } from '@ngrx/store';
import { User } from 'firebase';

export enum ActionTypes {
    LOGIN = '[Auth] LOGIN',
    GOOGLE_LOGIN = '[Auth] GOOGLE LOGIN',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGIN_FAILED = '[Auth] Login Failed',
    Logout = '[Auth] Logout'
}

export class Login implements Action {
    readonly type = ActionTypes.LOGIN;
}

export class GoogleLogin implements Action {
    readonly type = ActionTypes.GOOGLE_LOGIN;
    constructor(public payload?: any) {}
}

export class LoginSuccess implements Action {
    readonly type = ActionTypes.LOGIN_SUCCESS;
    constructor(public payload: User ) {}
}

export class LoginFailed implements Action {
    readonly type = ActionTypes.LOGIN_FAILED;
}

export class Logout implements Action {
    readonly type = ActionTypes.Logout;
}


export type ActionsUnion
= Login
| GoogleLogin
| LoginSuccess
| LoginFailed
| Logout;
