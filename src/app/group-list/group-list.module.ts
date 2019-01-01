import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupListRoutingModule } from './group-list-routing.module';
import { GroupListComponent } from './group-list/group-list.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CreateGroupDialogComponent } from './create-group-dialog/create-group-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    GroupListRoutingModule,

    AngularFirestoreModule
  ],
  declarations: [GroupListComponent, CreateGroupDialogComponent],
  entryComponents: [CreateGroupDialogComponent]
})
export class GroupListModule { }
