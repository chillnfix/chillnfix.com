import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, from } from 'rxjs';
import { UserActionTypes } from '../../actions/user/user.actions';
import { map, switchMap, catchError } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

import * as userActions from '../../actions/user/user.actions';
import * as authActions from '../../../actions/auth.actions';
import { User } from 'src/app/models/user.model';
import { auth as firebaseAuth } from 'firebase/app';

@Injectable()
export class UserEffects {

  @Effect()
  getUser$: Observable<userActions.All> = this.actions.pipe(
    ofType(UserActionTypes.GetUser),
    switchMap(() => this.afAuth.authState),
    map(authData => {
      if (authData) {
        const user = new User(authData.uid, authData.displayName || '', authData.email || '');
        return new userActions.Authenticated(user);
      }
      return new userActions.NotAuthenticated();
    }),
    catchError(() => of(new userActions.AuthError()))
  );

  @Effect()
  googleLogin$: Observable<userActions.All> = this.actions.pipe(
    ofType(authActions.ActionTypes.GOOGLE_LOGIN),
    switchMap(payload => {
      return from(this.googleLogin());
    }),
    map(credential => {
      return new userActions.GetUser();
    }),
    catchError((err) => of(new userActions.AuthError({ err: err.message })))
  );

  constructor(private actions: Actions, private afAuth: AngularFireAuth) {}

  googleLogin() {
    const provider = new firebaseAuth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }
}
