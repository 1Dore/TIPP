import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { FormularioService } from 'src/app/services/formulario.service';

class Mensaje{
  tipo_emisor: boolean;
  h_envio: Date;
  emisor: string;
  mensaje: string;
}


@Component({
  selector: 'app-user-collab-chat',
  templateUrl: './user-collab-chat.component.html',
  styleUrls: ['./user-collab-chat.component.scss']
})
export class UserCollabChatComponent implements OnInit {

  mensajeForm: FormGroup;

  usuario: true;
  title = 'app';
  userId = 999;
  mensajeForms: Array<Mensaje> = new Array<Mensaje>();

  userDisplayName: string = '';


  constructor(private router: Router, public userService: FormularioService, private fb: FormBuilder,
              public collabService: ColaboradorService, public chatService: ChatService) { }

  ngOnInit(): void {
    this.mensajeForm = this.fb.group({
      string: ["", Validators.required] ,
    });
    this.usuario = true;
    this.userDisplayName = localStorage.getItem('loggedUser');
  }

  obtenerMensajes() {
    let temp: Mensaje;
    this.chatService.getMensajes({con_id: 1}).subscribe(mensajes => {
      mensajes.formularios.rows.forEach(mensaje => {
        temp.mensaje = mensaje.content;
        temp.emisor = mensaje.sendBy;
        temp.h_envio = mensaje.fecha;

      });
    })
  }

  //Chat

  enviarmensaje() {
    let mensaje_text: string = this.mensajeForm.value.string;
    this.chatService.sendMensajes(mensaje_text);
  }

  abrir(ruta){
    this.router.navigateByUrl(ruta);  
  }
  
  irA(ruta){
    this.router.navigateByUrl(ruta);
  }

  // Cosas que copie y pegue



}
