import { ActionReducerMap } from '@ngrx/store';
import { User } from './models/user.model';
import * as fromUser from 'src/app/components/user.reduccer';

export interface AppState {
    users: User[];
}

export const appReducers: ActionReducerMap<AppState> = {
    users: fromUser.userReducer
};
