import { Component, OnInit } from '@angular/core';
import { RolsView } from 'src/app/models/login';
import { InformationUserService } from 'src/app/services/information-user.service';
import { RolsService } from '../../services/rols.service';
import { Guid } from 'guid-typescript';
import { InformationUserView } from 'src/app/models/user';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { IdentityUserView } from '../../models/user';
import { ConfigurationService } from '../../services/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listRols: RolsView[];
  rolSelect: any;
  nameSelect: any;
  listUsers: InformationUserView[];
  content: boolean;
  currentUser: IdentityUserView;
  constructor(private _rolsService: RolsService,
              private _inforService: InformationUserService,
              private _configS: ConfigurationService,
              private router: Router) { 
                this.content = false;
              }

  ngOnInit() {
    this.currentUser = this._configS.GetCurrentUser();
    console.log(this.currentUser );
    this.GetRols();
    this.GetInfoUserByNameOrRolsId("", null);
  }

  GetRols() {
    this._rolsService.GetRols()
     .subscribe((responsev: RolsView[]) => {
        this.listRols = responsev;
    },
    error => { 
      console.log('Error login', error);
    }, 
    () => { 
    }); 
  }

  GetInfoUserByNameOrRolsId(name: string, rolId?: Guid) {
    this._inforService.InfoUserByNameOrRolsId(name, rolId)
     .subscribe((responsev: InformationUserView[]) => {
        this.listUsers = responsev;
        //console.log('Respuesta',this.listUsers);
    },
    error => { 
      console.log('Error servicio', error);
    }, 
    () => { 
      this.content = true;
    }); 
  }

  search(){
    this.nameSelect == undefined ? this.nameSelect = "": this.nameSelect = this.nameSelect;
    this.rolSelect == 'null' ? this.rolSelect = null: this.rolSelect = this.rolSelect;
    this.GetInfoUserByNameOrRolsId(this.nameSelect, this.rolSelect);

  }

  DeleteUser(informationUserId) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: '¿Desea eliminar el usuario?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this._inforService.RemoveInformationUser(informationUserId)
     .subscribe((response) => {
        console.log('Respuesta',response);
    },
    error => { 
      console.log('Error servicio', error);
      Swal.fire('No se pudo eliminar usuario', '', 'error');
    }, 
    () => { 
    }); 
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
      }
    })
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login'])
  }


}
