//app.routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from '../guards/auth.guard';
import { LoginGuard } from '../guards/login.guard';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  {path:'login', component:LoginComponent}, 
  {path:'admin', component: AdminComponent, canActivate:[AuthGuard]},
  {path:'signup', component: SignupComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path:'', component:LoginComponent},
  {path:"**", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
