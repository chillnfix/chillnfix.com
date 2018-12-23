import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: firebase.User | null = null;

  constructor(private afAuth: AngularFireAuth) {
  }

  getUser() {
    return this.user;
  }

  isLoggedIn() {
    return this.afAuth.user.pipe(
      tap(user => this.user = user),
      map((user) => !!user),
      catchError(err => of(false))
    );
  }
}
