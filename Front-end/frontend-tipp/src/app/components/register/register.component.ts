import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formulario.service';
import { RegisterForm } from './RegisterForm';
import CryptoJS from 'crypto-js';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup;
  pasword_igual: Boolean;
  
  imgSrc: string = "../../../../assets/img/anonimo.jpg";

  constructor(private fb:FormBuilder, private formularioService: FormularioService, private router:Router) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre:['', Validators.required],
      apellido:['', Validators.required],
      Correo:['', Validators.required],
      Password:['', Validators.required],
      Rep_Password:['', Validators.required]
    })

    this.pasword_igual = (this.formulario.controls.Password.value == this.formulario.controls.Rep_Password.value)
  }

  

  onSubmit(){

    let formulario:RegisterForm = new RegisterForm();

    formulario.nombre = this.formulario.value.nombre;
    formulario.apellido = this.formulario.value.apellido;
    formulario.correo = this.formulario.value.Correo;
    formulario.contraseña = this.formulario.value.Password;
    formulario.foto = this.imgSrc;
    

    //---------------------------------------encriptacion-------------------------------
    var passwordBytes = CryptoJS.enc.Utf16LE.parse(formulario.contraseña);
    var sha1Hash = CryptoJS.SHA1(passwordBytes);
    var sha1HashToBase64 = sha1Hash.toString(CryptoJS.enc.Base64);
    formulario.contraseña = CryptoJS.enc.Utf16.parse(sha1HashToBase64);
    formulario.contraseña = CryptoJS.SHA1(formulario.contraseña).toString();
    //---------------------------------------encriptacion---------------------------------
    

    

    this.formularioService.sentRegister(formulario).subscribe((data) => {
      console.log(data);
      if(data.formularios.rowCount > 0){
        alert("Nuevo usuario Creado");
        this.router.navigateByUrl('/TIPP_Register');
      }
      else {
        alert("Ha habido un error, por favor, pruebe otra vez en unos minutos");
      }
    });
    this.formulario.reset();
  }

  abrir(ruta:string){
    this.router.navigateByUrl(ruta);
  }

}
