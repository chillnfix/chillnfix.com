import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupListRoutingModule } from './group-list-routing.module';
import { GroupListComponent } from './group-list/group-list.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    GroupListRoutingModule
  ],
  declarations: [GroupListComponent]
})
export class GroupListModule { }
