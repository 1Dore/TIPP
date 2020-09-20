import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormularioService } from 'src/app/services/formulario.service';
import { DataSource } from '@angular/cdk/collections';
import { LoginFormulario } from './LoginFormulario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm:FormGroup;
  datasource:DataSource<LoginFormulario>

  constructor(private fb:FormBuilder, private formularioService:FormularioService, private router:Router) { }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      CorreoLog:['', Validators.required],
      PasswordLog:['', Validators.required]
    })
  }


  onSubmit(){
    let Login:LoginFormulario = new LoginFormulario();
    Login.correo = this.LoginForm.controls.CorreoLog.value;
    Login.contraseña = this.LoginForm.controls.PasswordLog.value;
    console.log(Login.correo);
    this.formularioService.sentLogin(Login).subscribe((data) => 
    {
      if(data.formularios.rowCount == 1){
        this.router.navigateByUrl('/usermenu');
      }
      else {
        alert("Correo o contraseña incorrectos");
      }
    }

    );
    this.LoginForm.reset();
  }


  
  abrir(ruta:string){
    this.router.navigateByUrl(ruta);
  }
}
