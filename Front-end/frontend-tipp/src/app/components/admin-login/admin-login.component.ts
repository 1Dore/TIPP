import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import CryptoJS from 'crypto-js';


class formulario{
  correo:String
  password:String
}

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  form: FormGroup


  constructor(private fb:FormBuilder, private router:Router, private service:AdminService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      correo:['', Validators.required],
      password:['', Validators.required]
    });

  }

  onSubmit(ruta){
    let login:formulario = new formulario();

    login.correo = this.form.value.correo;
    login.password = this.form.value.password;

        //---------------------------------------encriptacion-------------------------------
        var passwordBytes = CryptoJS.enc.Utf16LE.parse(login.password);
        var sha1Hash = CryptoJS.SHA1(passwordBytes);
        var sha1HashToBase64 = sha1Hash.toString(CryptoJS.enc.Base64);
        login.password = CryptoJS.enc.Utf16.parse(sha1HashToBase64);
        login.password = CryptoJS.SHA1(login.password).toString();
        //---------------------------------------encriptacion---------------------------------
        
    this.service.loginAdmin(login).subscribe(data => {

      if (data.message == "Se obtvo informacion satisfactoriamente del formulario"){
        alert("Login exitoso");
        this.abrir('admin-mode/menu')
      }
      else alert("No se ha encontrado al usuario");

    });

  }

  abrir(ruta:string){
    this.router.navigateByUrl(ruta);
  }

}
