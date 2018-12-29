import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SocialButton } from 'src/app/enums/social-button.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: FormControl;
  password: FormControl;
  isSignIn = true;

  constructor(private afAuth: AngularFireAuth, private router: Router) {
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
  }

  login() {
    this.afAuth.auth.signInWithEmailAndPassword('', '').then(res => {
      console.log('res: ', res);
    }).catch(err => console.error(err));
  }

  async googleLogin() {
    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.router.navigate(['/home/groups']);
  }

  signInWithSocial(account: SocialButton) {
    switch(account) {
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
