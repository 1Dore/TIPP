import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup;
  constructor(private fb:FormBuilder, private router:Router) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre:['', Validators.required],
      Correo:['', Validators.required],
      Password:['', Validators.required]
    })
  }

  onSubmit(){

  }

  abrir(ruta:string){
    this.router.navigateByUrl(ruta);
  }

}
