import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'home'    , component: HomeComponent , canActivate: [AuthGuardService]},
  { path: 'login'   , component: LoginComponent },
  { path: 'user'   , component: UserComponent, canActivate: [AuthGuardService] },
  { path: 'user/:id'   , component: UserComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
