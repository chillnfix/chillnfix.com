import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // user: firebase.User | null = null;
  groupName = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(30)
  ]);
  groupCreateError: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {
    // this.afAuth.user.subscribe(user => this.user = user);
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

}
