import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formulario.service';
import { RegisterForm } from './RegisterForm';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup;
  pasword_igual: Boolean;
  
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
    formulario.correo = this.formulario.value.correo;
    formulario.contraseña = this.formulario.value.password;
    console.log(formulario.contraseña); 
    this.formularioService.sentRegister(formulario).subscribe((data) => {
      if(data.status == 1){
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
