import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formulario.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  Form:FormGroup

  constructor(private router:Router, public auth:FormularioService, private fb:FormBuilder) { }
  userDisplayName = '';

  ngOnInit(): void {
    if(this.auth.isLogin()){
      let id = Number(localStorage.getItem('id'));

      this.Form = this.fb.group({
        correo:['', Validators.required],
        password:['', Validators.required],
        nombre:['', Validators.required],
        apellido:['', Validators.required],
        telefono:['', Validators.required]
      });
  
      this.userDisplayName = localStorage.getItem('loggedUser');
    }

    else{
      this.logOut();
    }

  }

  onSubmit(){
    
  }
  
  abrir(ruta){
    this.router.navigateByUrl(ruta);  
  }
  
  irA(ruta){
    this.router.navigateByUrl(ruta);
  }

  logOut(){
    localStorage.clear();
    this.router.navigateByUrl('blabla');
  }
  

}
