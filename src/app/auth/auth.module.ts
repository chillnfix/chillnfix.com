import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    MaterialModule
  ],
  declarations: [LoginComponent, SignupComponent],
  entryComponents: [
    LoginComponent
  ]
})
export class AuthModule { }
