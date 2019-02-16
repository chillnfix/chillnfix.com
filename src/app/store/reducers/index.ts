import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import * as fromUser from './user/user.reducer';

export interface AppState {
  user: fromUser.UserState;
}

export const reducers: ActionReducerMap<AppState, any> = {
  user: fromUser.reducer,
};


export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];
