import { StringMap } from '@angular/compiler/src/compiler_facade_interface';
import { Component, OnInit } from '@angular/core';
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

  center: google.maps.LatLngLiteral;

  ngOnInit(): void {
    this.datosEstado = new estado();
    this.datosEstado.id = Number(localStorage.getItem('id'));
    this.datosEstado.estado = '';
    this.userDisplayName = localStorage.getItem('loggedUser');
    this.getColaboradoresEstado();
    this.obtenerCitas();
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
}


