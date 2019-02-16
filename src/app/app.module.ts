import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { MaterialModule } from './material/material.module';
import { httpInterceptorProviders } from './http-interceptors';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { reducers, metaReducers } from './store/reducers';
import { AppEffects } from './store/effects/app.effects';
import { UserEffects } from './store/effects/user/user.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // firebase modules
    AngularFireModule.initializeApp(environment.firebase, 'chillnfix'),
    AngularFireAuthModule,

    MaterialModule,

    StoreModule.forRoot(reducers, { metaReducers }),

    !environment.production ? StoreDevtoolsModule.instrument() : [],

    EffectsModule.forRoot([AppEffects, UserEffects]),
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
