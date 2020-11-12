import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { FormularioService } from 'src/app/services/formulario.service';
import { UserCollabChatComponent } from '../user-collab-chat/user-collab-chat.component';

class Calificado {
  id:Number
  con_id:Number
  nombre:String
  CoU:String
  calificacion:Number
}

@Component({
  selector: 'app-user-colab-calificacion',
  templateUrl: './user-colab-calificacion.component.html',
  styleUrls: ['./user-colab-calificacion.component.scss']
})
export class UserColabCalificacionComponent implements OnInit {

  formCalificacion:FormGroup;

  constructor(private fb: FormBuilder, public collabAuth:ColaboradorService, public userAuth:FormularioService, 
              public dialogRef:MatDialogRef<UserCollabChatComponent>, @Inject(MAT_DIALOG_DATA) public data)  { }

  elCalificado:Calificado

  ngOnInit(): void {
    console.log(this.data)
    this.formCalificacion = this.fb.group({

      nombre:["", Validators.required],
      calificacion:["", Validators.required],

    });
    this.elCalificado.con_id = this.data.id;
    if(this.data.CoU){  //true usuario, false colab
      this.elCalificado.CoU = "U";
      
    }
    else{
      this.elCalificado.CoU = "C";
    }
  }

  onSubmit(){

  }

}
