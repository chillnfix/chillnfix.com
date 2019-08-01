import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialButton } from 'src/app/enums/social-button.enum';
import { Store, select } from '@ngrx/store';
import * as authActions from 'src/app/actions/auth.actions';
import { selectUser, UserState, selectIsUserLoggedIn } from 'src/app/store/reducers/user/user.reducer';
import { UserActionTypes } from 'src/app/store/actions/user/user.actions';
import * as userActions from 'src/app/store/actions/user/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: FormControl;
  password: FormControl;
  isSignIn = true;

  constructor(private afAuth: AngularFireAuth, private router: Router, private store: Store<UserState>) {
    this.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(16)
    ]);
  }

  ngOnInit() {
    this.store.pipe(select(selectIsUserLoggedIn)).subscribe(loggedIn => {
      console.log('user loggedIn: ', loggedIn);
      if (loggedIn) {
        this.router.navigate(['/home/groups'], { replaceUrl: true });
      }
    });
    this.store.dispatch(new userActions.GetUser());
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword('', '').then(res => {
      console.log('res: ', res);
    }).catch(err => console.error(err));
  }

  async googleLogin() {
    this.store.dispatch(new authActions.GoogleLogin());
    // this.router.navigate(['/home/groups']);
  }

  signInWithSocial(account: SocialButton) {
    switch (account) {
      case SocialButton.Google:
        this.googleLogin();
        break;
      default:
        throw new Error('not implemented yet.');
    }
  }

  signUp() {
    console.log('not implemented yet.');
  }

}
