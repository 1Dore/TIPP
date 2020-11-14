import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
import { throwMatDuplicatedDrawerError } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ColaboradorService } from 'src/app/services/colaborador.service';

class Estado{
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
  estrellas:number
}


@Component({
  selector: 'app-colab-menu',
  templateUrl: './colab-menu.component.html',
  styleUrls: ['./colab-menu.component.scss']
})
export class ColabMenuComponent implements OnInit {

  constructor(private router:Router, public auth:ColaboradorService) { }
  userDisplayName = '';
  listaCitasNuevas:Array<citas> = new Array<citas>();
  listaCitasAgendadas:Array<citas> = new Array<citas>();
  datosEstado:Estado;
  citas = false;
  aceptado = false;

  center: google.maps.LatLngLiteral;
  img: string;

  ngOnInit(): void {
    if(this.auth.isLogin()){
      this.img = localStorage.getItem("img");

      this.datosEstado = new Estado();
      this.datosEstado.id = Number(localStorage.getItem('id'));
      this.datosEstado.estado = '';
      this.userDisplayName = localStorage.getItem('loggedUser');
      this.getColaboradoresEstado();
      this.obtenerCitasNuevas();
      this.obtenerCitasAgendadas();
      this.guardarUbicacion();
      if(this.listaCitasAgendadas.length > 0 && this.listaCitasAgendadas.length > 0) this.citas = true;

    }
    else{
      this.logOut();
    }
  }

  getColaboradoresEstado(){
    this.auth.getColaboradoresEstado(this.datosEstado).subscribe(data => {
      if(data.formularios.rows[0].estado == '' || data.formularios.rows[0].estado == null){
        this.datosEstado.estado = "D";
        this.datosEstado.display = "Disponible";
        this.auth.cambiarEstado(this.datosEstado).subscribe(rows => {
          console.log(rows.message);
        });
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

  cambiarEstadoCita(estado, id){
    let temp:Estado = new Estado();
    temp.id = id;
    temp.estado = estado;
    this.auth.cambiarEstadoCita(temp).subscribe(data => {
      console.log(data.message);
      alert(this.getEstado(estado));
    });

  }

  obtenerCitasNuevas(){
    let tempCitas:Array<citas> = new Array<citas>(); 
    //obtengo las citas que tiene el colaborador asignaads
    this.auth.getCitasNuevas( {id:this.datosEstado.id} ).subscribe(data => {

      data.formularios.rows.forEach(info => {
        
        let temp:citas = new citas();

        if (data.formularios.rowCount > 0){

          this.citas = true;
          temp.contrato_id = info.con_id;

          //como en la base de datos vienen los chars (a,e,r,c) transformarlo a (aceptado, enviado, rechazado, completado) respectivamente
          temp.estado = this.getEstado(info.estado);
          temp.nombre = "";
          temp.u_id = info.u_id;
          temp.descripcion = info.descripcion;

          //busco el nombre, apellid, tags, telefono del usuario
          this.auth.getUsuarioData( { u_id: info.u_id } ).subscribe(data => {
            console.log(data);
            //me permite desplegar el nombre completo y no pelearme en unir 2 campos de la lista
            temp.nombre = data.formularios.rows[0].nombre + " "+data.formularios.rows[0].apellido;

            temp.telefono = data.formularios.rows[0].telefono;

            let promedio = data.formularios.rows[0].total_estrellas / data.formularios.rows[0].total_contratos;
            temp.estrellas = promedio;

          });

          tempCitas.push(temp);
          
        }

      });

    });

    this.listaCitasNuevas = tempCitas;
    this.obtenerCitasAgendadas()

  }


  obtenerCitasAgendadas(){

    //obtengo las citas que tiene el colaborador asignaads
    this.auth.getCitasAgendadas( {id:this.datosEstado.id} ).subscribe(data => {

      data.formularios.rows.forEach(info => {
        
        let temp:citas = new citas();

        if (data.formularios.rowCount > 0){

          this.citas = true;
          temp.contrato_id = info.con_id;

          //como en la base de datos vienen los chars (a,e,r,c) transformarlo a (aceptado, enviado, rechazado, completado) respectivamente
          temp.estado = this.getEstado(info.estado);
          temp.nombre = "";
          temp.u_id = info.u_id;
          temp.descripcion = info.descripcion;

          //busco el nombre, apellid, tags, telefono del usuario
          this.auth.getUsuarioData( { u_id: info.u_id } ).subscribe(data => {

            //me permite desplegar el nombre completo y no pelearme en unir 2 campos de la lista
            temp.nombre = data.formularios.rows[0].nombre + " "+data.formularios.rows[0].apellido;

            temp.telefono = data.formularios.rows[0].telefono;
            //sacar el promedio de estrellas estrellas = tot_estrellas / tot_contratos
            let promedio = data.formularios.rows[0].total_estrellas / data.formularios.rows[0].total_contratos;
            temp.estrellas = promedio;

          });

          this.listaCitasAgendadas.push(temp);

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

  //como en la base de datos vienen los chars (a,e,r,c) transformarlo a (aceptado, enviado, rechazado, completado) respectivamente
  getEstado(estado){
    let temp;
          //como en la base de datos vienen los chars (a,e,r,t,n,c) transformarlo a (aceptado, enviado, rechazado, Terminado, No calificado, Calificado) respectivamente
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

  //Guardar Ubicacion
  guardarUbicacion(){
    let ubicacion;
    navigator.geolocation.getCurrentPosition((position) => {
      ubicacion = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      console.log(JSON.stringify(ubicacion));
      this.auth.setUbicacionActual({ubicacion: JSON.stringify(ubicacion), id: this.datosEstado.id}).subscribe(cosas =>{
    });
    
    
    })
  }

  irAlChat(contrato_id: number, c_id: number){
    this.irA('/user-collab/chat?con_id=' + contrato_id + '&c_id=' + c_id);
  }

  logOut(){
    localStorage.clear();
    this.router.navigateByUrl('blabla');
  }

}


