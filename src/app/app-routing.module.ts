import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { canActivate ,redirectLoggedInTo,redirectUnauthorizedTo } from "@angular/fire/auth-guard";
import { ProfileComponent } from './components/profile/profile.component';
const redirecToLogin=()=> redirectUnauthorizedTo(['login']);
const redirecToHome=()=> redirectLoggedInTo(['home'])
const routes: Routes = [
  
  {path:"", pathMatch:'full' , component:LandingComponent},
  {path:'login' , component:LoginComponent, ...canActivate(redirecToHome) },
  {path:'sign-up' , component:SignupComponent , ...canActivate(redirecToHome)},
  {path:'home' , component:HomeComponent, ...canActivate(redirecToLogin)},
  {path:'profile' , component:ProfileComponent, ...canActivate(redirecToLogin)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
