import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of, from } from 'rxjs';
import { Action } from '@ngrx/store';
import { mergeMap, catchError, map } from 'rxjs/operators';
import * as fromAuth from '../actions/auth.actions';
import { auth } from 'firebase/app';


@Injectable()
export class AuthEffects {

  // Listen for 'LOGIN' action
  @Effect()
  login$: Observable<Action> = this.actions$.pipe(
    ofType(fromAuth.ActionTypes.LOGIN),
    mergeMap(action => {
      return from(this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()))
        .pipe(
          map(credentials => {
            // If successful, dispatch success action with result
            if (!credentials.user) {
              return new fromAuth.LoginFailed();
            }
            return new fromAuth.LoginSuccess(credentials.user);
          }),
          catchError(err => {
            // If request fails, dispatch failed action
            return of(new fromAuth.LoginFailed());
          })
        );
    })
  );

  constructor(private actions$: Actions, private afAuth: AngularFireAuth) { }

}
