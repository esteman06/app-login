import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { RolsView } from 'src/app/models/login';
import { InformationUserView } from 'src/app/models/user';
import { InformationUserService } from 'src/app/services/information-user.service';
import { RolsService } from 'src/app/services/rols.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  entityUser: InformationUserView = {
    firstName: '',
    lastName: '',
    address:'',
    phone: '',
    email: '',
    age: null,
    rolsId: null,
    password: '',
  };
  idUser: Guid;
  title: string;
  listRols: RolsView[];
  rolSelect: any;
  edit: boolean;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private _inforService: InformationUserService,
              private _rolsService: RolsService) { 
    this.activatedRoute.params.subscribe(parametros => {
      this.idUser = parametros['id'];
      if(this.idUser) {
        console.log('entro con id');
        this.title = "Editar Usuario"
        this.edit = true;
        this.GetInformationUserById();
      }
      else {console.log('entro sin id');
      this.title = "Nuevo Usuario" 
      this.edit = false;

      }
    }); 
  }

  ngOnInit() {
    this.GetRols();
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

  Save(forma: NgForm) {
    this.entityUser.rolsId = this.rolSelect;
    if(this.edit) {
      this.UpdateUser();
    }
    else {
      this.AddUser();
    }
  }
  GetInformationUserById() {
    this._inforService.InformationUserById(this.idUser)
     .subscribe((response: InformationUserView) => {
       this.entityUser = response;
        console.log('Respuesta',response);
    },
    error => { 
      console.log('Error servicio', error);
    }, 
    () => { 
      this.rolSelect = this.entityUser.rolsId;
    }); 
  }

  AddUser() {
    this._inforService.CreateInformationUser(this.entityUser)
     .subscribe((response) => {
        console.log('Respuesta',response);
    },
    error => { 
      console.log('Error servicio', error);
    }, 
    () => { 
      Swal.fire('Usuario agregado', '', 'success').then((result) => {
        console.log('resul',result)
        /* Read more about isConfirmed, isDenied below */
        if (result.value) {
          this.router.navigate(['/home']);
        }
      });
    }); 
  }

  UpdateUser() {
    this._inforService.UpdateInformationUser(this.entityUser)
     .subscribe((response) => {
        console.log('Respuesta',response);
    },
    error => { 
      console.log('Error servicio', error);
    }, 
    () => { 
      Swal.fire('Usuario editado', '', 'success').then((result) => {
        if (result.value) {
          this.router.navigate(['/home']);
        }
        
      });
    }); 
  }

  

}
