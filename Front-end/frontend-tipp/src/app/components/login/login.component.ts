import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormularioService } from 'src/app/services/formulario.service';
import { DataSource } from '@angular/cdk/collections';
import { LoginFormulario } from './LoginFormulario';
import { Router } from '@angular/router';
import CryptoJS from 'crypto-js';
import { ThrowStmt } from '@angular/compiler';
import { ColaboradorService } from 'src/app/services/colaborador.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  LoginForm:FormGroup;
  datasource:DataSource<LoginFormulario>
  collab_mode:boolean = false;

  constructor(private fb:FormBuilder, public formularioService:FormularioService, public colaboradorService:ColaboradorService, private router:Router) { }

  ngOnInit(): void {
    this.LoginForm = this.fb.group({
      correoLog:['', Validators.required],
      passwordLog:['', Validators.required]
    })

  }


  onSubmit(){
    
    if(this.collab_mode == true){
      this.loginColab();
    }
    else{
      this.loginUser();
    }

  }

  loginUser(){
    let login:LoginFormulario = new LoginFormulario();

    login.correo = this.LoginForm.value.correoLog;
    login.contraseña = this.encriptar(this.LoginForm.value.passwordLog);
    login.id = 0;



    this.formularioService.sentLogin(login).subscribe((data) => {
      console.log(data);
      if (data.formularios.rowCount > 0){
        login.id = data.formularios.rows[0].u_id;
        localStorage.setItem('loggedUser', login.correo);
        localStorage.setItem("id", ""+login.id);
        localStorage.setItem("user_type", "user");
        localStorage.setItem("img", ""+data.formularios.rows[0].u_foto)
        this.formularioService.loged();
        this.formularioService.isLogin();
        alert("Inicio de sesion exitoso");
        this.router.navigateByUrl('usermenu');
      }
      else {
        alert("Datos incorrectos");
      }

    });
  }

  loginColab(){
    let login:LoginFormulario = new LoginFormulario();

    login.correo = this.LoginForm.value.correoLog;
    login.contraseña = this.encriptar(this.LoginForm.value.passwordLog);
    login.id = 0;



    this.colaboradorService.sentLoginColab(login).subscribe((data) => {
      console.log(data);
      if (data.formularios.rowCount > 0){
        login.id = data.formularios.rows[0].c_id;
        localStorage.setItem('loggedUser', login.correo);
        localStorage.setItem("id", ""+login.id);
        localStorage.setItem("user_type", "collab");
        localStorage.setItem("img", ""+data.formularios.rows[0].c_foto)
        this.formularioService.loged();
        this.formularioService.isLogin();
        alert("Inicio de sesion exitoso");
        this.router.navigateByUrl('colabmenu');
        this.colaboradorService.loged();
      }
      else {
        alert("Datos incorrectos");
      }

    });
  }

  encriptar(contraseña:string){
          //---------------------------------------encriptacion-------------------------------
    var passwordBytes = CryptoJS.enc.Utf16LE.parse(contraseña);
    var sha1Hash = CryptoJS.SHA1(passwordBytes);
    var sha1HashToBase64 = sha1Hash.toString(CryptoJS.enc.Base64);
    contraseña = CryptoJS.enc.Utf16.parse(sha1HashToBase64);
    contraseña = CryptoJS.SHA1(contraseña).toString();
     //---------------------------------------encriptacion---------------------------------
    return contraseña;
  }
  
  abrir(ruta:string){
    this.router.navigateByUrl(ruta);
  }
}
