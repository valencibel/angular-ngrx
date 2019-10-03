import * as auth from 'src/app/store/reducers/auth.reducers';
import * as user from 'src/app/store/reducers/user.reducer';

import { createFeatureSelector, ActionReducerMap } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export interface AppState {
  users: User[];
  authState: auth.State;
}

export const appReducers = {
  auth: auth.authReducer,
  users: user.userReducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');