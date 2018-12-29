import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialButtonsComponent } from './social-buttons/social-buttons.component';
import { MatButtonModule, MatGridListModule } from '@angular/material';

@NgModule({
  declarations: [SocialButtonsComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatGridListModule
  ],
  exports: [
    SocialButtonsComponent
  ]
})
export class SocialButtonsModule { }
