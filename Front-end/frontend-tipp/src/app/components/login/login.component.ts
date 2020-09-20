import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormularioService } from 'src/app/services/formulario.service';
import { DataSource } from '@angular/cdk/collections';
import { LoginFormulario } from './LoginFormulario';
import { Router } from '@angular/router';
import CryptoJS from 'crypto-js';


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
      correoLog:['', Validators.required],
      passwordLog:['', Validators.required]
    })
  }


  onSubmit(){
    let login:LoginFormulario = new LoginFormulario();

    login.correo = this.LoginForm.controls.CorreoLog.value;

        //---------------------------------------encriptacion-------------------------------
    var passwordBytes = CryptoJS.enc.Utf16LE.parse(login.contraseña);
    var sha1Hash = CryptoJS.SHA1(passwordBytes);
    var sha1HashToBase64 = sha1Hash.toString(CryptoJS.enc.Base64);
    login.contraseña = CryptoJS.enc.Utf16.parse(sha1HashToBase64);
    login.contraseña = CryptoJS.SHA1(login.contraseña).toString();
     //---------------------------------------encriptacion---------------------------------


    this.formularioService.sentLogin(login).subscribe((data) => 
    {
      if(data.formularios.message == "Insercion realizada"){
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
