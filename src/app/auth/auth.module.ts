import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SocialButtonsModule } from '../social-buttons/social-buttons.module';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    SocialButtonsModule,
    MaterialModule,
  ],
  declarations: [LoginComponent]
})
export class AuthModule { }
