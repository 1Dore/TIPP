import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formulario.service';
import CryptoJS from 'crypto-js';

class userData{
  nombre:String
  apellido:String
  telefono:String
  correo:String
  contraseña:String
  id:Number
}

@Component({
  selector: 'app-user-perfil',
  templateUrl: './user-perfil.component.html',
  styleUrls: ['./user-perfil.component.scss']
})
export class UserPerfilComponent implements OnInit {
  UserForm:FormGroup
  data:userData
  constructor(private form:FormBuilder, private router:Router, public auth:FormularioService) { }
  userDisplayName = '';

  ngOnInit(): void {
    if(this.auth.isLogin()){
      this.data = new userData();
      let id = Number(localStorage.getItem('id'));
      let con = false;
  
      this.UserForm = this.form.group({
        correo:['', Validators.required],
        password:['', Validators.required],
        nombre:['', Validators.required],
        apellido:['', Validators.required],
        telefono:['', Validators.required]
      });
  
      this.auth.askUserData(id).subscribe(data => {
  
        this.data.nombre = data.formularios.rows[0].nombre;
        this.data.apellido = data.formularios.rows[0].apellido;
        this.data.correo = data.formularios.rows[0].correo;
        this.data.telefono = data.formularios.rows[0].telefono;
        this.data.contraseña = data.formularios.rows[0].contraseña;
        
        
        this.UserForm.setValue({
          correo:this.data.correo,
          password:"Espacio",
          nombre:this.data.nombre,
          apellido:this.data.apellido,
          telefono:this.data.telefono
        });
  
  
      });
  
      console.log(this.UserForm.value.password)
      this.userDisplayName = localStorage.getItem('loggedUser');
    }
    else{
      this.logOut();
    }

  }



  onSubmit(){
    console.log(this.data);
    let datos:userData = new userData();
    datos.nombre = this.UserForm.value.nombre;
    datos.apellido = this.UserForm.value.apellido;
    datos.correo = this.UserForm.value.correo;
    datos.telefono = this.UserForm.value.telefono;
    datos.id = Number(localStorage.getItem("id"));
    datos.contraseña = "";

    if (this.UserForm.value.password == "Espacio"){
      datos.contraseña = this.data.contraseña;
    }
    else{
      datos.contraseña = this.UserForm.value.password;
      //---------------------------------------encriptacion-------------------------------
      var passwordBytes = CryptoJS.enc.Utf16LE.parse(datos.contraseña);
      var sha1Hash = CryptoJS.SHA1(passwordBytes);
      var sha1HashToBase64 = sha1Hash.toString(CryptoJS.enc.Base64);
      datos.contraseña = CryptoJS.enc.Utf16.parse(sha1HashToBase64);
      datos.contraseña = CryptoJS.SHA1(datos.contraseña).toString();
       //---------------------------------------encriptacion---------------------------------
    }

    this.auth.updateUserData(datos).subscribe(data => {

      if(data.message == "Datos de usuario Actualizados") alert("Datos actualizados satisfactoriamete");
      else {
        console.log(data);
        alert("A habido un error");}

    });

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
