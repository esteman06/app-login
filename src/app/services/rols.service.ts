import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class RolsService {
  private SerUrl: string = '';
  private httpOptions: {headers: HttpHeaders} ;

  constructor(private http: HttpClient,
              private _config: ConfigurationService) { 
                this.SerUrl = _config.GetUrlService() + '/Rols';
                
              }

  GetRols() {
    console.log('ntro al servicio');
    this.httpOptions = this._config.GetHeaderAuthorization();
    const obs = this.http.get(this.SerUrl, this.httpOptions);
    return obs;
  }

}
