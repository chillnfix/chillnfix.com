import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User | null = null;

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
