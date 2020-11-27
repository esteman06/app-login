import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigurationService } from './config.service';
import { Guid } from 'guid-typescript';
import { InformationUserView } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class InformationUserService {
  private SerUrl: string = '';
  private httpOptions: {headers: HttpHeaders} ;

  constructor(private http: HttpClient,
              private _config: ConfigurationService) { 
                this.SerUrl = _config.GetUrlService() + '/InformationUser';
                
              }

  InfoUserByNameOrRolsId(name: string, rolId: Guid) {
    console.log('ntro al servicio');
    this.httpOptions = this._config.GetHeaderAuthorization();
    var url= "";
    if(name == "" && rolId == null){
       url = this.SerUrl + "/GetInfoUserByNameOrRolsId";
    } else if(name != "" && rolId == null){
      url = this.SerUrl + "/GetInfoUserByNameOrRolsId?name="+name;
    } else if(name == "" && rolId != null){
      url = this.SerUrl + "/GetInfoUserByNameOrRolsId?rolsId="+rolId;
    } else {
      url = this.SerUrl + "/GetInfoUserByNameOGetInfoUserByNameOrRolsId?name=" +name +"&rolsId="+rolId
    }
    console.log('url', url);
    const obs = this.http.get(url, this.httpOptions);
    return obs;
  }

  CreateInformationUser(view: InformationUserView) {
    this.httpOptions = this._config.GetHeaderAuthorization();
    const url = this.SerUrl + "/CreateInformationUser";
    console.log('view', view);
    const obs = this.http.post(url, view, this.httpOptions);
    return obs;
  }

  UpdateInformationUser(view: InformationUserView) {
    this.httpOptions = this._config.GetHeaderAuthorization();
    const url = this.SerUrl + "/UpdateInformationUser";
    console.log('url', url);
    const obs = this.http.post(url, view, this.httpOptions);
    return obs;
  }

  RemoveInformationUser(id: Guid) {
   //http://192.168.0.14:5000/InformationUser/RemoveInformationUser/FC02A741-BDC5-4ED6-8F81-83E2754A3DC4
    console.log('informationUserID', id);
    this.httpOptions = this._config.GetHeaderAuthorization();
    const url = this.SerUrl + "/RemoveInformationUser/" + id;
    console.log('url', url);
    const obs = this.http.post(url, this.httpOptions);
    return obs;
  }

  InformationUserById(informationUserID: Guid) {
    this.httpOptions = this._config.GetHeaderAuthorization();
    const url = this.SerUrl + "/GetInformationUserById/" + informationUserID;
    console.log('url', url);
    const obs = this.http.get(url, this.httpOptions);
    return obs;
  }

}