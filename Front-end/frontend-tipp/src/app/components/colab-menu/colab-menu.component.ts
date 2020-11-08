import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaborador.service';

class estado{
  id:Number
  estado:String
  display:String
}

class citas{
  nombre:String
  descripcion:String
  contrato_id:Number
  estado:String
  u_id:Number
  telefono:String
}

@Component({
  selector: 'app-colab-menu',
  templateUrl: './colab-menu.component.html',
  styleUrls: ['./colab-menu.component.scss']
})
export class ColabMenuComponent implements OnInit {

  constructor(private router:Router, public auth:ColaboradorService) { }
  userDisplayName = '';
  listaCitas:Array<citas> = new Array<citas>();
  datosEstado:estado;
  citas = true;

  center: google.maps.LatLngLiteral;

  ngOnInit(): void {
    this.datosEstado = new estado();
    this.datosEstado.id = Number(localStorage.getItem('id'));
    this.datosEstado.estado = '';
    this.userDisplayName = localStorage.getItem('loggedUser');
    this.getColaboradoresEstado();
    this.obtenerCitas();
    this.guardarUbicacion();
  }

  getColaboradoresEstado(){
    this.auth.getColaboradoresEstado(this.datosEstado).subscribe(data => {
      if(data.formularios.rows[0].estado == '' || data.formularios.rows[0].estado == null){
        this.datosEstado.estado = "D";
        this.datosEstado.display = "Disponible";
      }
      else{
        if(data.formularios.rows[0].estado == "D"){
          this.datosEstado.display = "Disponible";
        }
        else{
          this.datosEstado.display = "Ocupado";
        }
        this.datosEstado.estado = data.formularios.rows[0].estado;
      }
    });
  }

  cambiarEstado(){
    
    if(this.datosEstado.estado == "D"){
      this.datosEstado.estado = "O";
      this.datosEstado.display = "Ocupado";
    }
    else{
      this.datosEstado.estado = "D";
      this.datosEstado.display = "Disponible";
    }
    this.auth.cambiarEstado(this.datosEstado).subscribe(rows => {
      console.log(rows.message);
    });
  }

  obtenerCitas(){

    //obtengo las citas que tiene el colaborador asignaads
    this.auth.getCitas( {id:this.datosEstado.id} ).subscribe(data => {

      data.formularios.rows.forEach(info => {
        
        let temp:citas = new citas();

        if (data.formularios.rowCount > 0){

          this.citas = true;
          temp.contrato_id = info.con_id;

          //como en la base de datos vienen los chars (a,e,r,c) transformarlo a (aceptado, enviado, rechazado, completado) respectivamente
          if(info.estado == "E"){
            temp.estado = "Enviado";
          }
          else if(info.estado == "R"){
            temp.estado = "Rechazado";
          }
          else if(info.estado == "C"){
            temp.estado = "Completado";
          }
          else{
            temp.estado = "Aceptado";
          }

          temp.nombre = "";
          temp.u_id = info.u_id;

          //busco el nombre, apellid, tags, telefono del usuario
          this.auth.getUsuarioData( { u_id: info.u_id } ).subscribe(data => {

            //me permite desplegar el nombre completo y no pelearme en unir 2 campos de la lista
            temp.nombre = data.formularios.rows[0].nombre + " "+data.formularios.rows[0].apellido;

            temp.telefono = data.formularios.rows[0].telefono;

          });

          this.listaCitas.push(temp);

        }

      });

    });

  }


  getUsuarioData(data){
    let nombre:String;
    let telefono:String;

    let lista = [nombre, telefono];
    console.log(lista);
    return lista;
  }

  irA(ruta){
    this.router.navigateByUrl(ruta);
  }

  //Guardar Ubicacion
  guardarUbicacion(){
    let ubicacion;
    navigator.geolocation.getCurrentPosition((position) => {
      ubicacion = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
    });
    this.auth.setUbicacionActual({ubicacion: JSON.stringify(ubicacion)});
  }

    irAlChat(contrato_id: number, c_id: number){
    this.irA('/user-collab/chat?con_id=' + contrato_id + '&c_id=' + c_id);
  }

}


