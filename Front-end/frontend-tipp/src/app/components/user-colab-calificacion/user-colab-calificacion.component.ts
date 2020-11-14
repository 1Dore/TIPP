import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { FormularioService } from 'src/app/services/formulario.service';
import { UserCitasComponent } from '../user-citas/user-citas.component';
import { UserCollabChatComponent } from '../user-collab-chat/user-collab-chat.component';


class Calificado {
  id:number
  con_id:number
  nombre:String
  CoU:String
  calificacion:number
  totalEstrellas:number
  totalContratos:number
}


class Contrato{
  id:number;
  fecha:string;
}


@Component({
  selector: 'app-user-colab-calificacion',
  templateUrl: './user-colab-calificacion.component.html',
  styleUrls: ['./user-colab-calificacion.component.scss']
})
export class UserColabCalificacionComponent implements OnInit {

  formCalificacion:FormGroup;

  constructor(private fb: FormBuilder, public collabAuth:ColaboradorService, public userAuth:FormularioService,  
              public dialogRef:MatDialogRef<UserCollabChatComponent>, @Inject(MAT_DIALOG_DATA) public data, private router:Router,
              public dialgoRef:MatDialogRef<UserCitasComponent>)  { }

  elCalificado:Calificado
  calButton:number = 5;
  promedio = false;

  ngOnInit(): void {
    this.elCalificado = new Calificado();
    console.log(this.data)
    //aqui obtengo la calificacion

    
    this.elCalificado.con_id = this.data.con_id;
    this.elCalificado.id = this.data.id;

    if(!this.data.CoU){  //true colabordor, false usuario
      this.elCalificado.CoU = "C";

        this.userAuth.getColabData({c_id:this.elCalificado.id}).subscribe(data => {
          console.log(data);
          this.elCalificado.nombre = data.formularios.rows[0].nombre;
          if(data.formularios.rows[0].total_estrellas == null){
            this.elCalificado.totalContratos = 0;
            this.elCalificado.totalEstrellas = 0;
          }
          else {
            this.elCalificado.totalContratos = data.formularios.rows[0].total_contratos;
            this.elCalificado.totalEstrellas = data.formularios.rows[0].total_estrellas;
            this.promedio = true;
          }
        });

    }
    else{
      this.elCalificado.CoU = "U";

      this.collabAuth.getUsuarioData({u_id:this.elCalificado.id}).subscribe(data => {
        console.log(data);
        this.elCalificado.nombre = data.formularios.rows[0].nombre;
        if(data.formularios.rows[0].total_estrellas == null){
          this.elCalificado.totalContratos = 0;
          this.elCalificado.totalEstrellas = 0;
        }
        else {
          this.elCalificado.totalContratos = data.formularios.rows[0].total_contratos;
          this.elCalificado.totalEstrellas = data.formularios.rows[0].total_estrellas;
          this.promedio = true;
        }

      });
    }

    console.log(this.elCalificado);
  }



  onSubmit(){
    let temp:Contrato = new Contrato();
    temp.id = this.data.con_id;
    this.elCalificado.calificacion = Number(this.calButton);  //calificacion que da el boton del pop-up
    console.log(this.elCalificado);
    this.elCalificado.totalEstrellas = Number(this.elCalificado.totalEstrellas + this.elCalificado.calificacion);
    this.elCalificado.totalContratos = this.elCalificado.totalContratos + 1;
      this.collabAuth.getFechayHora().subscribe(data => {

        let tempFecha = new Date(data.formularios.rows[0].fyh);
        temp.fecha = String(tempFecha);
  
        this.collabAuth.terminarContrato(temp).subscribe(rows => {
          this.collabAuth.calificarUsuario(this.elCalificado).subscribe( tuples => {
            alert(tuples.message);
            alert(rows.message);
            this.dialogRef.close();
            this.router.navigateByUrl('/colabmenu')
          })
  
        });
  
      });

  }

  calificacionUser(){
    let temp:Contrato = new Contrato();
    temp.id = this.data.con_id;
    this.elCalificado.calificacion = Number(this.calButton);  //calificacion que da el boton del pop-up
    console.log(this.elCalificado);
    this.elCalificado.totalEstrellas = Number(this.elCalificado.totalEstrellas + this.elCalificado.calificacion);
    this.elCalificado.totalContratos = this.elCalificado.totalContratos + 1;
      this.userAuth.getFechayHora().subscribe(data => {

        let tempFecha = new Date(data.formularios.rows[0].fyh);
        temp.fecha = String(tempFecha);
        this.userAuth.completarContrato({id:this.elCalificado.con_id}).subscribe(rows => {

          this.userAuth.calificarColab(this.elCalificado).subscribe( tuples => {
            alert(tuples.message);
            alert(rows.message);
            this.dialogRef.close();
            this.router.navigateByUrl('/usermenu')
          });

        });

  
      });
  }

}
