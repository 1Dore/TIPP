import { Component, ElementRef, OnInit, Query, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formulario.service';
import { UserCreaContratoComponent } from '../user-crea-contrato/user-crea-contrato.component';

class Etiqueta{
  nombre: string;
  id: number;
}

class Ubicacion{
  lat: number;
  lng: number
}

class id{
  id: number;
}

class colaborador{
  id: number;
  nombre: string;
  etiquetas: Array<Etiqueta>;
  foto: string;
  correo: string;
  ubicacion: Ubicacion;
}

class Contrato{
  u_id:Number;
  c_id:Number;
  fecha_inicio:String;
}

declare var google:any;

@Component({
  selector: 'app-usermenu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.scss']
})
export class UsermenuComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow
  
  constructor(private router: Router, private fb: FormBuilder, public auth:FormularioService, public dialogo: MatDialog) { }
  placeHolder;
  //cosas de google maps
  name_tags: FormGroup;
  modo: string;
  stringList: Array<string>;
  query:string;
  lista_collabs: Array<Array<colaborador>> = new Array<Array<colaborador>>();
  lista_temp: Array<colaborador> = new Array<colaborador>();
  collabs_ids: Array<id> = new Array<id>();
  encontrados: boolean;

  limitador: number = 0;
  ubicaciones;


  userDisplayName = '';
  
  zoom = 12
  center: google.maps.LatLngLiteral
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
    this.modo = "mapa";
    this.name_tags = this.fb.group({
      string: [""],
    });
    this.userDisplayName = localStorage.getItem('loggedUser');
    const params = new URLSearchParams(location.search);
    params.set('string', '');
    window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);
    this.beginSearch();
    this.ubicacionActual();
    this.ubicaciones = setTimeout(() => {
      this.getUbicacionColaboradores(); 
    }, 3000);
    
  }

  //-----------------------  CODIGO DEL MAPA -------------------------

  modoMapa(){
    this.modo = "mapa";
  }

  ubicacionActual(){
    let ubicacion_Actual: Ubicacion = new Ubicacion();
    let id: number;
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }
      console.log(this.center);
      ubicacion_Actual.lat = this.center.lat
      ubicacion_Actual.lng = this.center.lng
      id = Number(localStorage.getItem("id"));
      this.auth.setUbicacionActual({ubicacion: JSON.stringify(ubicacion_Actual), id: id}).subscribe();
      this.addMiposicion();
    })
  }


  click(event: google.maps.MouseEvent) {
    console.log(event)
  }

  logCenter() {
    console.log(JSON.stringify(this.map.getCenter()))
  }

  addMiposicion() {
    this.markers.push({
      position: {
        lat: this.center.lat,
        lng: this.center.lng,
      },
      label: {
        color: 'black',
        text: "Aqui Estoy",
      },
      title: 'Marker title ' + (this.markers.length + 4),
      info: 'Marker info ' + (this.markers.length + 1),
    })
  }

  addMarcador(ubicacion: Ubicacion){
    console.log(ubicacion);
    this.markers.push({
      position: {
        lat: ubicacion.lat,
        lng: ubicacion.lng,
      },
      label: {
        color: 'black',
        text: "Colaborador",
      },
      title: 'Marker title ' + (this.markers.length + 4),
      info: 'Marker info ' + (this.markers.length + 1),
    })
  }

  openInfo(marker: MapMarker, content) {
    this.infoContent = content
    this.info.open(marker)
  }

  // Ubicacion de los colaboradores
  getUbicacionColaboradores(){
    console.log(this.lista_collabs);
    this.lista_collabs.forEach(collabs => {
      collabs.forEach(collab => {
        this.addMarcador(collab.ubicacion);
      })
    })
  }

  funcion(){
    this.beginSearch();
    this.getUbicacionColaboradores();
  }

  //--------------- FIND DEL CODIGO DEL MAPA ------------------------

  //--------------- CODIGO DE LA LISTA DE COLABORADORES --------------

  buscarColaboradores(){
    this.modo = "buscador";
    let string: string;
    const params = new URLSearchParams(location.search);
    if(this.name_tags.value.string === ""){
      string = "";
    }else{
      string = this.name_tags.value.string;
    }
    params.set('string', string);
    window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);
    this.beginSearch();
    
  }
  
  buscarCollabsIDs(){
    let temp: Array<id> = new Array<id>();
     this.auth.searchColaboradoresIDs({where: this.query}).subscribe((rows) => {
       
       if(rows.formularios.rows.length > 0){
         this.encontrados = true;
         this.lista_collabs = new Array<Array<colaborador>>();
         this.lista_temp = new Array<colaborador>();
         rows.formularios.rows.forEach((id) => {
           this.getCollabInfo(Number(id.c_id));
         });
       }else{
         this.encontrados = false;
         this.lista_collabs = new Array<Array<colaborador>>();
       }
     });
     this.collabs_ids = temp;
   }
 
   getCollabInfo(id: number){

     let temp: colaborador = new colaborador();
     this.auth.getCollabInfo({id: id}).subscribe((rows) => {
       rows.formularios.rows.forEach((info) => {
         temp.id = id;
         temp.nombre = info.nombre;
         temp.nombre += " " + info.apellido;
         temp.foto = info.c_foto;
         temp.correo = info.correo;
         temp.etiquetas = new Array<Etiqueta>();
         this.auth.getCollabTags({id: id}).subscribe((tags) => {
           if(tags.formularios.rows.length > 0){
             tags.formularios.rows.forEach((tag) => {
               let etiqueta: Etiqueta = new Etiqueta();
               etiqueta.nombre = tag.e_nombre;
               etiqueta.id = tag.e_id;
               temp.etiquetas.push(etiqueta);
             });
           }
          temp.ubicacion = JSON.parse(info.ubicacion);
         });
         
         if(this.limitador == 0){
          this.lista_temp.push(temp);
          this.lista_collabs.push(this.lista_temp);
          this.limitador++;
         }else if(this.limitador == 1){
           this.lista_collabs[this.lista_collabs.length-1].push(temp);
           this.limitador++;
         }
         else {
          this.lista_collabs[this.lista_collabs.length-1].push(temp);
          this.lista_temp = new Array<colaborador>();
          this.limitador = 0;
         }
         
       });
     });
     this.limitador = 0;
   }
   
   beginSearch(){
    
    const params = new URLSearchParams(window.location.search);
    if(params.get('string') == ""){
      this.query = "col.c_id IS NOT NULL AND estado = 'D'";
    }else{
      this.stringList = params.get('string').split(" ");
      this.generarConsulta();

    }
    
    this.buscarCollabsIDs();
   }
 
  getInfoFromID(){
    this.collabs_ids.forEach(id => {
 
    });
  }
 
   generarConsulta(){
     let primero:boolean = true;
     this.stringList.forEach(str => {
       if(primero){
         this.query = '(col.nombre LIKE ' + '\'%' + str + '%\'';
         this.query += ' OR col.apellido LIKE ' + '\'%' + str + '%\'';
         this.query += ' OR e.e_Nombre LIKE ' + '\'%' + str + '%\'';
         this.query += ' OR col.nombre LIKE ' + '\'' + str + '%\'';
         this.query += ' OR col.apellido LIKE ' + '\'' + str + '%\'';
         this.query += ' OR e.e_Nombre LIKE ' + '\'' + str + '%\'';
         this.query += ' OR col.nombre LIKE ' + '\'%' + str + '\'';
         this.query += ' OR col.apellido LIKE ' + '\'%' + str + '\'';
         this.query += ' OR e.e_Nombre LIKE ' + '\'%' + str + '\')';
         primero = false;
       }else{
         this.query += ' AND (col.nombre LIKE ' + '\'%' + str + '%\'';
         this.query += ' OR col.apellido LIKE ' + '\'%' + str + '%\'';
         this.query += ' OR e.e_Nombre LIKE ' + '\'%' + str + '%\'';
         this.query += ' OR col.nombre LIKE ' + '\'' + str + '%\'';
         this.query += ' OR col.apellido LIKE ' + '\'' + str + '%\'';
         this.query += ' OR e.e_Nombre LIKE ' + '\'' + str + '%\'';
         this.query += ' OR col.nombre LIKE ' + '\'%' + str + '\'';
         this.query += ' OR col.apellido LIKE ' + '\'%' + str + '\'';
         this.query += ' OR e.e_Nombre LIKE ' + '\'%' + str + '\')';
       }
       
     });
     this.query += " AND estado = 'D'";
     console.log(this.query);
   }


  // -------------- FIN DEL CODIDIGO DE LA LISTA DE COLABORADORES --------------

  // -------------- CODIGO PARA LOS CONTRATOS ----------------

  contratar(colaborador: colaborador){
    //aqui obtendria los datos del card
    const diologRef = this.dialogo.open(UserCreaContratoComponent, {
      width: '80%',
      data: colaborador,
    })
  }

  nextContrato(contrato:Contrato){
    this.auth.newContrato(contrato).subscribe(data => {
      if (data.message == "Se creo un contrato satisfactoriamente"){
        alert("Contrato creado");
        this.router.navigateByUrl("usermenu");
      }
    })
  }

  // ---------- FIN DEL CODIGO DEL CODIGO DE LOS CONTRATOS --------------------

  abrir(ruta){
    this.router.navigateByUrl(ruta);  
  }
  
  irA(ruta){
    this.router.navigateByUrl(ruta);
  }
  
    
}
