import { Action } from '@ngrx/store';

export const ADD_USER = '[User] Add User';
export const DELETE_USER = '[User] Delete User';
export const UPDATE_USER = '[User] Update User';

export class AddUserAction implements Action {
    readonly type = ADD_USER;

    constructor(public email: string, public password: string) {
    }
}

export class DeleteUserAction implements Action {
    readonly type = DELETE_USER;

    constructor(public id: number) {
    }
}

export class UpdateUserAction implements Action {
    readonly type = UPDATE_USER;

    constructor(public id: number, public email: string, public password: string ) {
    }
}

export type Actions = AddUserAction | DeleteUserAction | UpdateUserAction;
