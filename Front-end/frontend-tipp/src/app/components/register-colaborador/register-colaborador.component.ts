import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import CryptoJS from 'crypto-js';
import { AdminService } from 'src/app/services/admin.service';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { FormularioService } from 'src/app/services/formulario.service';
import { AdminMenuComponent } from '../admin-menu/admin-menu.component';

class formulario{
  nombre:String;
  correo:String;
  password:String;
  apellido:String;
}

@Component({
  selector: 'app-register-colaborador',
  templateUrl: './register-colaborador.component.html',
  styleUrls: ['./register-colaborador.component.scss']
})
export class RegisterColaboradorComponent implements OnInit {

  typesOfShoes: string[] = ['Electricista', 'Plomero/a', 'Peluquero/a', 'Chef', 'Asecino a sueldo'];

  formulario: FormGroup;

  constructor(private fb:FormBuilder, private router:Router, private service:ColaboradorService, public dialogRef:MatDialogRef<AdminMenuComponent>) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre:['', Validators.required],
      correo:['', Validators.required],
      password:['', Validators.required],
      apellido:['', Validators.required],
      Rep_password:['', Validators.required]
    })
  }

  onSubmit(){

    let form: formulario = new formulario();

    form.nombre = this.formulario.value.nombre;
    form.correo = this.formulario.value.correo;
    form.password = this.formulario.value.password;
    if(form.password == this.formulario.value.Rep_password) this.formulario.invalid;
    form.apellido = this.formulario.value.apellido;

    //---------------------------------------encriptacion-------------------------------
    var passwordBytes = CryptoJS.enc.Utf16LE.parse(form.password);
    var sha1Hash = CryptoJS.SHA1(passwordBytes);
    var sha1HashToBase64 = sha1Hash.toString(CryptoJS.enc.Base64);
    form.password = CryptoJS.enc.Utf16.parse(sha1HashToBase64);
    form.password = CryptoJS.SHA1(form.password).toString();
    //---------------------------------------encriptacion---------------------------------
    
    
    this.service.sentColRegiser(form).subscribe(data => {

      if (data.menssage == "Insercion realizada") {
        alert("Se ha registrado exitosamente");
        this.dialogRef.close();
      }
      else alert("ha ocurrido un error");

    })


  }

  abrir(ruta){
    this.router.navigateByUrl(ruta);  
  }
    

}
