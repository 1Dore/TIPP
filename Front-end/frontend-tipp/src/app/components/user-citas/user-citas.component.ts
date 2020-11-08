import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formulario.service';


class Citas{
  nombre:String
  descripcion:String
  contrato_id:Number
  estado:String
  c_id:Number
  telefono:String
  ocupacion:String
  etiquetas:Array<Etiqueta>
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

  constructor(private router:Router, public auth:FormularioService) { }

  //variables globales constantes
  listaCitas:Array<Citas> = new Array<Citas>();
  citas = false;

  ngOnInit(): void {
    this.userDisplayName = localStorage.getItem('loggedUser');
    this.obtenerCitas();
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
          if(row.estado == "E"){
            temp.estado = "Enviado";
          }
          else if(row.estado == "R"){
            temp.estado = "Rechazado";
          }
          else if(row.estado == "C"){
            temp.estado = "Completado";
          }
          else{
            temp.estado = "Aceptado";
          }

          temp.nombre = "";
          temp.c_id = row.c_id;
          temp.contrato_id = row.con_id;

          //busco el nombre, apellid, tags, telefono del colaborador
          this.auth.getColabData( { c_id: temp.c_id } ).subscribe(datos => {

            //me permite desplegar el nombre completo y no pelearme en unir 2 campos de la lista
            temp.nombre = datos.formularios.rows[0].nombre + " " +datos.formularios.rows[0].apellido

            temp.telefono = datos.formularios.rows[0].telefono;

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
          this.listaCitas.push(temp);

        });


      } 

    })


    console.log(this.listaCitas);
  }

  irAlChat(contrato_id: number, c_id: number){
    this.irA('/user-collab/chat?con_id=' + contrato_id + '&c_id=' + c_id);
  }

  irA(ruta){
    this.router.navigateByUrl(ruta);
  }

}
