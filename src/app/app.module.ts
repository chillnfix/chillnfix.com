import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { MaterialModule } from './material/material.module';
import { CreateGroupDialogComponent } from './create-group-dialog/create-group-dialog.component';
import { FormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './http-interceptors';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    CreateGroupDialogComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    // firebase modules
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,

    MaterialModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent],
   entryComponents: [
    CreateGroupDialogComponent
  ]
})
export class AppModule { }
