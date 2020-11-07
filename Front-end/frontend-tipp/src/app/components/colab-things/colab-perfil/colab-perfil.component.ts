import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import CryptoJS from 'crypto-js';

class ColabData{
  nombre:String
  apellido:String
  telefono:String
  correo:String
  contraseña:String
  id:Number
}

@Component({
  selector: 'app-colab-perfil',
  templateUrl: './colab-perfil.component.html',
  styleUrls: ['./colab-perfil.component.scss']
})


export class ColabPerfilComponent implements OnInit {

  UserForm:FormGroup
  data:ColabData

  constructor(private form:FormBuilder, public auth:ColaboradorService, private router:Router) { }
  userDisplayName = '';


  ngOnInit(): void {

    this.data = new ColabData();
    let id = Number(localStorage.getItem('id'));
    let con = false;

    this.UserForm = this.form.group({
      correo:['', Validators.required],
      password:['', Validators.required],
      nombre:['', Validators.required],
      apellido:['', Validators.required],
      telefono:['', Validators.required]
    });

    this.auth.askColabData(id).subscribe(data => {

      this.data.nombre = data.formularios.rows[0].nombre;
      this.data.apellido = data.formularios.rows[0].apellido;
      this.data.correo = data.formularios.rows[0].correo;
      this.data.telefono = data.formularios.rows[0].telefono;
      this.data.contraseña = data.formularios.rows[0].c_contraseña;

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

  onSubmit(){

    let datos:ColabData = new ColabData();
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
      datos.contraseña = this.encriptar(datos.contraseña);
    }
    console.log(datos);

    this.auth.updateColabData(datos).subscribe(data => {

      if(data.message == "Datos de usuario Actualizados") alert("Datos actualizados satisfactoriamete");
      else {
        console.log(data);
        alert("A habido un error");}

    });

  }

  encriptar(contraseña:String){
      //---------------------------------------encriptacion-------------------------------
      var passwordBytes = CryptoJS.enc.Utf16LE.parse(contraseña);
      var sha1Hash = CryptoJS.SHA1(passwordBytes);
      var sha1HashToBase64 = sha1Hash.toString(CryptoJS.enc.Base64);
      contraseña = CryptoJS.enc.Utf16.parse(sha1HashToBase64);
      contraseña = CryptoJS.SHA1(contraseña).toString();
       //---------------------------------------encriptacion---------------------------------
    return contraseña;
  }

  abrir(ruta){
    this.router.navigateByUrl(ruta);  
  }
  
  irA(ruta){
    this.router.navigateByUrl(ruta);
  }

}
