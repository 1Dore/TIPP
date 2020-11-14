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
  total_contratos:number;
  total_estrellas:number;
  foto: string;
}

class Etiqueta{
  e_id: number;
  e_nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-register-colaborador',
  templateUrl: './register-colaborador.component.html',
  styleUrls: ['./register-colaborador.component.scss']
})
export class RegisterColaboradorComponent implements OnInit {

  etiqueta_list: Array<Etiqueta> = new Array<Etiqueta>();
  correo: string;
  formulario: FormGroup;
  seleccionarEtiquetas: boolean = false;
    
  imgSrc: string = "../../../../assets/img/anonimo.jpg";


  constructor(private fb:FormBuilder, private router:Router, private service:ColaboradorService, public dialogRef:MatDialogRef<AdminMenuComponent>) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      nombre:['', Validators.required],
      correo:['', Validators.required],
      password:['', Validators.required],
      apellido:['', Validators.required],
      Rep_password:['', Validators.required]
    });
    this.service.getEtiquetas().subscribe((rows) => {
      console.log(rows);
      if(rows.status === 1){
        let listat = new Array<Etiqueta>();
        rows.formularios.rows.forEach(etiqueta => {
          let temp: Etiqueta = new Etiqueta();
          temp.e_id = etiqueta.e_id;
          temp.e_nombre = etiqueta.e_nombre;
          temp.descripcion = temp.descripcion;
          listat.push(temp);
        });
        this.etiqueta_list = listat;
        console.log(this.etiqueta_list);
        console.log("--");
        console.log(listat);
      }
    });
  }

  onSubmit(){

    let form: formulario = new formulario();

    form.nombre = this.formulario.value.nombre;
    form.correo = this.formulario.value.correo;
    this.correo = this.formulario.value.correo;
    form.password = this.formulario.value.password;
    if(form.password == this.formulario.value.Rep_password) this.formulario.invalid;
    form.apellido = this.formulario.value.apellido;
    form.total_contratos = 1;
    form.total_estrellas = 5;
    form.foto = this.imgSrc;

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
      }
      else alert("ha ocurrido un error");

    })
    this.seleccionarEtiquetas = true;
  }

  getEtiquetas(){
    this.service.getEtiquetas().subscribe((rows) => {
      console.log(rows);
      if(rows.status === 1){
        rows.formularios.rows.forEach(etiqueta => {
          let temp: Etiqueta = new Etiqueta();
          temp.e_id = etiqueta.e_id;
          temp.e_nombre = etiqueta.e_nombre;
          temp.descripcion = temp.descripcion;
          this.etiqueta_list.push(temp);
        });
      }
    })
    
    
  }

  setCollabTags(tags_selecionados){
    //obtengo el id del colaborador resien creado
    this.service.getIdByEmail({correo: this.correo}).subscribe((rows) => {
      let col_id = rows.formularios.rows[0].c_id;
      //segun los tags seleccionados, linkeo el id del colaborador con estas estas etiquetas
      tags_selecionados.forEach(tag => {
        this.service.setCollabTags({c_id: col_id, e_id: tag.value}).subscribe()
        alert("Etiquetas agregadas");
      });
      
    });

    this.dialogRef.close();
  }


  abrir(ruta){
    this.router.navigateByUrl(ruta);  
  }
    

}
