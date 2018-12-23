import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private db: AngularFirestore, public afAuth: AngularFireAuth) {
  }

  // createGroup() {
  //   if (!this.user) return;

  //   this.db.collection(`/groups/${this.user.uid}/groups`).add(
  //     {
  //       name: this.groupName.value,
  //       isAdmin: true
  //     }
  //   ).then(res => {
  //     console.log(res);
  //   }).catch(err => {
  //     console.log(err.message);
  //     this.groupCreateError = err.message;
  //   });
  // }
}
