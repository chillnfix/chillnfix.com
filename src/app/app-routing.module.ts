import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  // { path: 'home', loadChildren: './home/home.module#HomeModule', canActivate: [AuthGuard] },
  { path: 'groups', loadChildren: './group-list/group-list.module#GroupListModule', canActivate: [AuthGuard] },
  { path: '', pathMatch: 'full', redirectTo: '/groups' },
  { path: '**', redirectTo: '/groups' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: true
  })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
