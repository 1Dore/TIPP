import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GoogleMap, MapInfoWindow } from '@angular/google-maps';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { FormularioService } from 'src/app/services/formulario.service';
import { UserColabCalificacionComponent } from '../user-colab-calificacion/user-colab-calificacion.component';

//${req.body.con_id}, '${req.body.emisor}', '${req.body.content}', '${req.body.fecha}')`
class Mensaje{
  con_id: number;
  emisor: boolean;
  fecha: Date;
  content: string;
}

class Usuario{
  nombre: string;
  id: number;
  tipo: boolean;
  ubicacion: Ubicacion;
}

class Ubicacion{
  lat: number;
  lng: number;
}


@Component({
  selector: 'app-user-collab-chat',
  templateUrl: './user-collab-chat.component.html',
  styleUrls: ['./user-collab-chat.component.scss']
})
export class UserCollabChatComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow


  mensajeForm: FormGroup;

  usuario: true;
  title = 'app';
  userId = 999;
  mensajeList: Array<Mensaje> = new Array<Mensaje>();


  userDisplayName = '';

  emisor: Usuario = new Usuario();
  receptor: Usuario = new Usuario();
  contrato_id: number;

  receptor_lugar;
  traerMensajes;

  constructor(private router: Router, public userService: FormularioService, private fb: FormBuilder,
              public collabService: ColaboradorService, public chatService: ChatService, public dialog:MatDialog) { }

  ngOnInit(): void {

    if(this.userService.isLogin() || this.collabService.isLogin()){

      this.mensajeForm = this.fb.group({
        string: ["", Validators.required],
      });
      this.usuario = true;
      this.userDisplayName = localStorage.getItem('loggedUser');
      this.emisor.id = Number(localStorage.getItem('id')); //id del emisor
      if(localStorage.getItem('user_type') == 'user') {
        this.emisor.tipo = true;
        this.receptor.tipo = false;
      }
      else {
        this.emisor.tipo = false;
        this.receptor.tipo = true;
      }
      const params = new URLSearchParams(window.location.search);
      this.receptor.id = Number(params.get('c_id'));
      this.contrato_id = Number(params.get('con_id'));
  
      this.obtenerMensajes();
  
      this.traerMensajes = setInterval(() => {
        this.obtenerMensajes(); 
      }, 3000);
    }
    else{
      this.logOut();
    }
    this.ubicacionActual();
    this.obtenerNombreReceptor();
    this.addMarcadordelReceptor(); 


    this.obtenerMensajes(); 
    this.traerMensajes = setInterval(() => {
      this.obtenerMensajes(); 
      this.addMarcador(this.receptor.ubicacion);
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.traerMensajes);
  }

  obtenerMensajes() {
    let mensajeList_temp: Array<Mensaje> = new Array<Mensaje>();
    this.chatService.getMensajes({con_id: this.contrato_id}).subscribe(mensajes => {
      mensajes.formularios.rows.forEach(mensaje => {
        let temp: Mensaje = new Mensaje();
        temp.content = mensaje.content;
        temp.emisor = String(mensaje.sendby) == "true";
        temp.fecha = mensaje.fecha;
        temp.con_id = mensaje.con_id;
        mensajeList_temp.push(temp);
      });
      this.mensajeList = mensajeList_temp;
    })
    
  }

  // Obtener los nombre de Receptor
  obtenerNombreReceptor(){
    if(this.receptor.tipo){
      this.userService.askUserData(this.receptor.id).subscribe(data => {
        
        if(data.formularios.rows.length > 0){
          this.receptor.nombre = data.formularios.rows[0].nombre + " " + data.formularios.rows[0].apellido;
        }
      })
    }else{
      this.collabService.askColabData(this.receptor.id).subscribe(data => {
        if(data.formularios.rows.length > 0){
          this.receptor.nombre = data.formularios.rows[0].nombre + " " + data.formularios.rows[0].apellido;
        }
      })
    }
  }

  //Chat
  //${req.body.con_id}, '${req.body.emisor}', '${req.body.content}', '${req.body.fecha}')`
  enviarmensaje() {
    let mensaje_text: string = this.mensajeForm.value.string;
    let mensaje_a_enviar: Mensaje = new Mensaje();
    mensaje_a_enviar.con_id = this.contrato_id;
    mensaje_a_enviar.content = mensaje_text;
    mensaje_a_enviar.emisor = this.emisor.tipo;
    this.userService.getFechayHora().subscribe(data => {
      let fecha_envio = new Date(data.formularios.rows[0].fyh);
      mensaje_a_enviar.fecha = fecha_envio;
    });
    
    this.mensajeList.push(mensaje_a_enviar);
    
    this.chatService.sendMensajes(mensaje_a_enviar).subscribe();
  }

  //-------------contratos----------------------------------------
  terminarContrato(){


    const diologRef = this.dialog.open(UserColabCalificacionComponent, {
      width: '40%',
      data: {con_id: this.contrato_id, CoU: this.receptor.tipo, id: this.receptor.id}
    });
  } 


  abrir(ruta){
    this.router.navigateByUrl(ruta);  
  }
  
  irA(ruta){
    this.router.navigateByUrl(ruta);
  }

  logOut(){
    localStorage.clear();
    this.router.navigateByUrl('blabla');
  }

  // Cosas que copie y pegue
  // ---- codigo para el mapa del chat ----

  // variables necesarias e iniciaciones
 
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

// funciones para el mapa
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
        text: "Aqui Estoy",
      },
      title: 'Marker title ' + (this.markers.length + 4),
      info: 'Marker info ' + (this.markers.length + 1),
    })
  }

  addMarcadordelReceptor(){
    if(this.receptor.tipo){
      this.userService.getUserUbicacioByID(this.receptor).subscribe(data => {
        this.receptor.ubicacion = JSON.parse(data.formularios.rows[0].ubicacion);

      });
    }else{
      this.collabService.getCollabUbicacioByID(this.receptor).subscribe(data => {
        
        this.receptor.ubicacion = JSON.parse(data.formularios.rows[0].ubicacion);
        
      });
    }
  }

  addMarcador(ubicacion: Ubicacion){
    if(this.markers.length == 1){
      this.markers.push({
        position: {
          lat: this.receptor.ubicacion.lat,
          lng: this.receptor.ubicacion.lng,
        },
        label: {
          color: 'black',
          text: this.receptor.nombre,
        },
        title: 'Marker title ' + (this.markers.length + 4),
        info: 'Marker info ' + (this.markers.length + 1),
      })
    }else{
      this.markers[1].position.lat = this.receptor.ubicacion.lat;
      this.markers[1].position.lng = this.receptor.ubicacion.lng;
    }
    console.log(this.markers);
  }
}
