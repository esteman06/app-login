import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ConfigurationService } from './config.service';
import { LoginRequestView } from '../models/login';
import { IdentityUserView } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private SerUrl: string = '';
  private httpOptions: {headers: HttpHeaders} ;

  constructor(private http: HttpClient,
              private _config: ConfigurationService) { 
    this.SerUrl = _config.GetUrlService() + '/Login';
  }

  Login(loginView: LoginRequestView): Observable<IdentityUserView> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }; 
    const obs = this.http.post<IdentityUserView>(this.SerUrl, loginView, httpOptions)
    .pipe(tap((user) => localStorage.setItem('currentUser', JSON.stringify(user))));
    return obs;
  }

  Logout() {
    /* console.log('Servicio de cerrar sesión');*/
    this.httpOptions = this._config.GetHeaderAuthorization();
    const obs = this.http.get(this.SerUrl, this.httpOptions);
    localStorage.removeItem('currentUser');
    return obs;
  }
}
