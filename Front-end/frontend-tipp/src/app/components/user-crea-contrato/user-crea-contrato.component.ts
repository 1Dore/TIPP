import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, Inject, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formulario.service';
import { ListaDeColaboradoresComponent } from '../lista-de-colaboradores/lista-de-colaboradores.component';
import {take} from 'rxjs/operators';

class Colaborador{
  id: number;
  nombre: string;
  etiquetas: Array<Etiqueta>;
  foto: string;
  correo: string;
  
  
}

class Etiqueta{
  nombre: string;
  id: number;
}

class Ubicacion{
  lat: number;
  lng: number
}

class Contrato{
  u_id:number;
  c_id:number;
  fecha_inicio: string;
  descripcion: string;
  ubicacion: string;
}

@Component({
  selector: 'app-user-crea-contrato',
  templateUrl: './user-crea-contrato.component.html',
  styleUrls: ['./user-crea-contrato.component.scss']
})
export class UserCreaContratoComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  contenido_contrato: FormGroup;

  constructor(public dialogREf: MatDialogRef<ListaDeColaboradoresComponent>, private userService:FormularioService,
              @Inject(MAT_DIALOG_DATA) public data: Colaborador, private router: Router, private fb: FormBuilder, private _ngZone: NgZone) { }

  zoom = 12
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeControl: false,
    zoomControl: true,
    scrollwheel: true,
    streetViewControl: false,
    fullscreenControl: false,
    disableDoubleClickZoom: true,
    mapTypeId: 'roadmap',
    maxZoom: 20,
    minZoom: 8,
  }
  markers = []
  infoContent = ''

  ngOnInit(): void {
    this.contenido_contrato = this.fb.group({
      descripcion:["", Validators.required]
    })
    console.log(this.data);
    this.ubicacionActual();
  }

  contratar(){
    //aqui obtendria los datos del card
    this.userService.getFechayHora().subscribe(data => {

      console.log( this.contenido_contrato.value.descripcion);
      
      let contrato = new Contrato();
      contrato.c_id = this.data.id; //id del colaborador
      contrato.u_id = Number(localStorage.getItem('id')); //id del usuario
      let fecha_inicio = new Date(data.formularios.rows[0].fyh);
      contrato.fecha_inicio = String(fecha_inicio);
      contrato.descripcion = this.contenido_contrato.value.descripcion;
      contrato.ubicacion = JSON.stringify({lat: this.center.lat, lng: this.center.lng});
      this.nextContrato(contrato);
    });
  }

  nextContrato(contrato:Contrato){
    this.userService.newContrato(contrato).subscribe(data => {
      if (data.message == "Se creo un contrato satisfactoriamente"){
        alert("Contrato creado");
        this.router.navigateByUrl("usermenu");
      }
    })
  }

  click(clicks){

  }

  ubicacionActual(){
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      console.log(this.center);
      this.addMiposicion();
    })
    
  }
  addMiposicion() {
    this.markers.push({
      position: {
        lat: this.center.lat,
        lng: this.center.lng,
      },
      label: {
        color: 'black',
        text: "Aqui esta el problema",
      },
      title: 'Marker title ' + (this.markers.length + 4),
      info: 'Marker info ' + (this.markers.length + 1),
    })
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }

}
