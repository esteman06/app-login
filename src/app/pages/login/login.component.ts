import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequestView } from 'src/app/models/login';
import { IdentityUserView } from 'src/app/models/user';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario: string;
  passwordV: string;
  loginRequestView: LoginRequestView;
  currentUser: IdentityUserView;
  constructor(private router: Router,
              private _loginService: LoginService) { }

  ngOnInit() {
  }

  login(formu: NgForm) {
    /* this.alert = false; */
    console.log(formu);
    this.usuario = formu.controls['username'].value;
    this.passwordV = formu.controls['password'].value;    
    this.loginRequestView = {name: this.usuario, password: this.passwordV};
    console.log('la data a enviar al servicio es: ', this.loginRequestView);
    this._loginService.Login(this.loginRequestView)
     .subscribe((responsev: IdentityUserView) => {
        this.currentUser = responsev;
        console.log('Respuesta del servicio Login: ',this.currentUser);
    },
    error => { 
      console.log('Error login', error);     
      if (error.status == '404') {
        console.error('Error ->', error.error.message);        
      } else {
        console.error('Error del servidor');        
      } 
    }, 
    () => { 
      this.router.navigate(['/home'])
      
    }); 
  }

}
