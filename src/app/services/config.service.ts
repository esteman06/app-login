import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { from } from 'rxjs';
import { IdentityUserView } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  serUrl: string = environment.url;
  UserCurrent: IdentityUserView;

  constructor() { }

  GetUrlService() {
    const Url = this.serUrl;
    return Url;
  }
  GetCurrentUser() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    return currentUser;
  }
  GetHeaderAuthorization() {
    this.UserCurrent = this.GetCurrentUser();
    const httpOptions = {
      headers: new HttpHeaders(
        { 'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.UserCurrent.token}` }, 
      )
    }; 
    return httpOptions;
  }

}
