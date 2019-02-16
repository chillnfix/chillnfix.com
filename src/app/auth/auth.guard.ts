import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Store, select } from '@ngrx/store';
import { UserState, selectIsUserLoggedIn } from '../store/reducers/user/user.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<UserState>,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(
      select(selectIsUserLoggedIn),
      map(loggedIn => {
        if (!loggedIn) {
          this.router.navigate(['/auth']);
        }
        return loggedIn;
      })
    );

    // return this.authService.isLoggedIn().pipe(
    //   map(loggedIn => {
    //     if (!loggedIn) {
    //       this.router.navigate(['/auth']);
    //     }
    //     return loggedIn;
    //   })
    // );
  }
}
