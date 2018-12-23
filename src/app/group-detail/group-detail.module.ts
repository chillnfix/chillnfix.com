import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupDetailRoutingModule } from './group-detail-routing.module';
import { MaterialModule } from '../material/material.module';
import { AddNewPostComponent } from './add-new-post/add-new-post.component';
import { FormsModule } from '@angular/forms';
import { AddUserToGroupComponent } from './add-user-to-group/add-user-to-group.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    GroupDetailRoutingModule,
  ],
  entryComponents: [
    AddNewPostComponent,
    AddUserToGroupComponent
  ],
  declarations: [GroupDetailComponent, AddNewPostComponent, AddUserToGroupComponent]
})
export class GroupDetailModule { }
