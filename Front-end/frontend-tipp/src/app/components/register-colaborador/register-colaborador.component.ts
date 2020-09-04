import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-colaborador',
  templateUrl: './register-colaborador.component.html',
  styleUrls: ['./register-colaborador.component.scss']
})
export class RegisterColaboradorComponent implements OnInit {

  typesOfShoes: string[] = ['Electricista', 'Plomero/a', 'Peluquero/a', 'Chef', 'Asecino a sueldo'];

  formulario: FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre:['', Validators.required],
      correo:['', Validators.required],
      password:['', Validators.required]
    })
  }

  onSubmit(){

  }

  abrir(){
    
  }
    

}
