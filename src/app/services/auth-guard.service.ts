import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { IdentityUserView } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser: IdentityUserView = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser) {
          // logged in so return true
          /* if(route.data.roles && route.data.roles.indexOf(currentUser.roleName) === -1) { */
            /* this.router.navigate(['/mainten/error'], { queryParams: { returnUrl: state.url } }); */
            return true;
          /* }
          return true; */
      }
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
  }
}

