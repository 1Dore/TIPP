import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formulario.service';

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
    
  }

  abrir(ruta:string){
    this.router.navigateByUrl(ruta);
  }

}
