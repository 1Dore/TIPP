import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formulario.service';
import { UserColabCalificacionComponent } from '../user-colab-calificacion/user-colab-calificacion.component';


class Citas{
  nombre:String
  descripcion:String
  contrato_id:Number
  estado:String
  c_id:Number
  telefono:String
  ocupacion:String
  etiquetas:Array<Etiqueta>
  foto: string
}


class Etiqueta{
  nombre: string;
  id: number;
}

@Component({
  selector: 'app-user-citas',
  templateUrl: './user-citas.component.html',
  styleUrls: ['./user-citas.component.scss']
})
export class UserCitasComponent implements OnInit {

  userDisplayName = '';

  constructor(private router:Router, public auth:FormularioService, public dialog:MatDialog) { }

  //variables globales constantes
  listaCitasAceptadas:Array<Citas> = new Array<Citas>();
  listaCitasEnviadas:Array<Citas> = new Array<Citas>();
  listaCitasTerminadas:Array<Citas> = new Array<Citas>();
  citas = false;
  chatBool = false;
  img: string;
  ngOnInit(): void {
    if(this.auth.isLogin()){
      this.img = localStorage.getItem("img");
      this.userDisplayName = localStorage.getItem('loggedUser');
      this.obtenerCitas();
    }
    else{
      this.logOut();
    }

  }


  obtenerCitas(){
    
    this.auth.getCitas({ id: Number(localStorage.getItem('id')) }).subscribe(data => {

      if(data.formularios.rowCount > 0){

        this.citas = true;

        //a cada fila del formularios, sacar los datos asignarlos a la listaCitas
        //para que al final sacarlps de la lista y desplegarlos a pantalla
        data.formularios.rows.forEach( row => {
          let temp:Citas = new Citas();

          //como en la base de datos vienen los chars (a,e,r,c) transformarlo a (aceptado, enviado, rechazado, completado) respectivamente
          console.log(row.estado);
          temp.estado = this.getEstado(row.estado);

          temp.nombre = "";
          temp.c_id = row.c_id;
          temp.contrato_id = row.con_id;

          //busco el nombre, apellid, tags, telefono del colaborador
          this.auth.getColabData( { c_id: temp.c_id } ).subscribe(datos => {

            //me permite desplegar el nombre completo y no pelearme en unir 2 campos de la lista
            temp.nombre = datos.formularios.rows[0].nombre + " " +datos.formularios.rows[0].apellido

            temp.telefono = datos.formularios.rows[0].telefono;
            temp.foto = datos.formularios.rows[0].c_foto;

            //es un array porque hay muchas etiquetas
            temp.etiquetas = new Array<Etiqueta>();

            //metodo para obtener todas las ocupaciones del colaborador
            this.auth.getCollabTags({id:temp.c_id}).subscribe(tags =>{
              if(tags.formularios.rows.length > 0){
                tags.formularios.rows.forEach((tag) => {
                  let etiqueta: Etiqueta = new Etiqueta();
                  etiqueta.nombre = tag.e_nombre;
                  etiqueta.id = tag.e_id;
                  temp.etiquetas.push(etiqueta);
                });
              }

            });

          });

          console.log(temp);
          if(temp.estado == "Aceptado"){
            this.listaCitasAceptadas.push(temp);
          }
          else if (temp.estado == "No calificado"){
            this.listaCitasTerminadas.push(temp);
          }
          else{
            this.listaCitasEnviadas.push(temp);
          }

        });

      } 

    })

  }

  irACalificacion(id, con_id){
    const diologRef = this.dialog.open(UserColabCalificacionComponent, {
      width: '40%',
      data: {con_id: con_id, CoU: false, id: id}
      //CoU siempre falso porque soy usuario, no necesito verificar nada
      //

    });
  }

  irAlChat(contrato_id: number, c_id: number){
    this.irA('/user-collab/chat?con_id=' + contrato_id + '&c_id=' + c_id);
  }

  getEstado(estado){
    let temp;
          //como en la base de datos vienen los chars (a,e,r,c) transformarlo a (aceptado, enviado, rechazado, completado) respectivamente
          if(estado == "E"){
            temp = "Enviado";

          }
          else if(estado == "R"){
            temp = "Rechazado";

          }
          else if(estado == "N"){
            temp = "No calificado";

          }
          else if(estado == "C"){
            temp = "Calificado";

          }
          else{
            temp = "Aceptado";

          }

          return temp;
  }

  irA(ruta){
    this.router.navigateByUrl(ruta);
  }
  
  logOut(){
    localStorage.clear();
    this.router.navigateByUrl('blabla');
  }

}
