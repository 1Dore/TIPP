import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from 'src/app/services/admin.service';
import { AdminMenuComponent } from '../admin-menu/admin-menu.component';

class etiquetas{
  id:Number
  nombre:String
  descripcion:String
}

@Component({
  selector: 'app-admin-edit-tag',
  templateUrl: './admin-edit-tag.component.html',
  styleUrls: ['./admin-edit-tag.component.scss']
})
export class AdminEditTagComponent implements OnInit {

  form_etiqueta:FormGroup;

  constructor(private fb:FormBuilder, private service:AdminService, public dialogRef:MatDialogRef<AdminMenuComponent>,  @Inject(MAT_DIALOG_DATA) public data:etiquetas) { }

  ngOnInit(): void {
    this.form_etiqueta = this.fb.group({
      nombre:["", Validators.required],
      descripcion:["", Validators.required],
      id:["", Validators.required]
    });
    this.form_etiqueta.setValue({
      id: this.data.id,
      nombre : this.data.nombre,
      descripcion : this.data.descripcion
    });
  }

  onSubmit(){
    let temp:etiquetas = new etiquetas();


    temp.id=this.form_etiqueta.value.id;
    temp.descripcion = this.form_etiqueta.value.descripcion;
    temp.nombre = this.form_etiqueta.value.nombre;


    this.service.editEtiqueta(temp).subscribe(rows => {
      alert(rows.message);
      this.dialogRef.close();
    });
  }

}
