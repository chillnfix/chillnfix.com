import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupDetailComponent } from './group-detail/group-detail.component';

const routes: Routes = [
  { path: '', component: GroupDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupDetailRoutingModule { }
