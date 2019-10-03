import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  SIGNUP = '[Auth] Signup',
  SIGNUP_SUCCESS = '[Auth] Signup Success',
  SIGNUP_FAILURE = '[Auth] Signup Failure',
  LOGOUT = '[Auth] Logout',
}

export enum UserActionTypes {
  ADD_USER = '[User] Add User',
  DELETE_USER = '[User] Delete User',
  UPDATE_USER = '[User] Update User'
}

/* -------------------*
 *    AUTH ACTIONS    *
 * ------------------ */

export class LogIn implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;
    constructor(public payload: any) {}
}

export class LogInFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any) {}
}

export class SignUp implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(public payload: any) {}
}

export class SignUpSuccess implements Action {
  readonly type = AuthActionTypes.SIGNUP_SUCCESS;
  constructor(public payload: any) {}
}

export class SignUpFailure implements Action {
  readonly type = AuthActionTypes.SIGNUP_FAILURE;
  constructor(public payload: any) {} 
}

export class LogOut implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

/* -------------------*
 *    USER ACTIONS    *
 * ------------------ */

export class AddUserAction implements Action {
  readonly type = UserActionTypes.ADD_USER;

  constructor(public email: string, public password: string) {
  }
}

export class DeleteUserAction implements Action {
  readonly type = UserActionTypes. DELETE_USER;

  constructor(public id: number) {
  }
}

export class UpdateUserAction implements Action {
  readonly type = UserActionTypes.UPDATE_USER;

  constructor(public id: number, public email: string, public password: string ) {
  }
}

export type All =
  | LogIn
  | LogInSuccess
  | LogInFailure
  | SignUp
  | SignUpSuccess
  | SignUpFailure
  | LogOut
  | AddUserAction 
  | DeleteUserAction 
  | UpdateUserAction;