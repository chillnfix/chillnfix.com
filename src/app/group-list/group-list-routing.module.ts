import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupListComponent } from './group-list/group-list.component';

const routes: Routes = [
  { path: '', component: GroupListComponent },
  { path: ':groupId/posts', loadChildren: '../group-detail/group-detail.module#GroupDetailModule' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupListRoutingModule { }
