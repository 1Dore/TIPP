import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { AdminMenuComponent } from '../admin-menu/admin-menu.component';

class etiqueta{
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-admin-create-tags',
  templateUrl: './admin-create-tags.component.html',
  styleUrls: ['./admin-create-tags.component.scss']
})
export class AdminCreateTagsComponent implements OnInit {

  form_etiqueta: FormGroup;

  constructor(private fb: FormBuilder,private service:AdminService, public dialogRef:MatDialogRef<AdminMenuComponent>) { }

  ngOnInit(): void {
    this.form_etiqueta = this.fb.group({
      nombre:["", Validators.required],
      descripcion:["", Validators.required]
    });
  }

  onSubmit(){
    let new_etiqueta: etiqueta = new etiqueta;
    new_etiqueta.nombre = this.form_etiqueta.value.nombre;
    new_etiqueta.descripcion = this.form_etiqueta.value.descripcion;

    console.log(this.form_etiqueta.value.nombre);

    this.service.newEtiqueta(new_etiqueta).subscribe((respuesta) => {
      if(respuesta.status = 0){
        alert("Error al intentar crear la etiqueta \n" + "Error:" + respuesta.message);
      }else{
        alert(respuesta.message);
        this.dialogRef.close();
      }
    });

  }

}
