import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { ColaboradorService } from 'src/app/services/colaborador.service';
import { FormularioService } from 'src/app/services/formulario.service';

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
  mensajeList: Array<Mensaje> = new Array<Mensaje>();


  userDisplayName = '';

  emisor: Usuario = new Usuario();
  receptor: Usuario = new Usuario();
  contrato_id: number;

  traerMensajes;

  constructor(private router: Router, public userService: FormularioService, private fb: FormBuilder,
              public collabService: ColaboradorService, public chatService: ChatService) { }

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
  }

  ngOnDestroy() {
    clearInterval(this.traerMensajes);
  }

  obtenerMensajes() {
    let mensajeList_temp: Array<Mensaje> = new Array<Mensaje>();
    this.chatService.getMensajes({con_id: this.contrato_id}).subscribe(mensajes => {
      console.log(mensajes.formularios.rows);
      mensajes.formularios.rows.forEach(mensaje => {
        let temp: Mensaje = new Mensaje();
        temp.content = mensaje.content;
        temp.emisor = String(mensaje.sendby) == "true";
        temp.fecha = mensaje.fecha;
        temp.con_id = mensaje.con_id;
        mensajeList_temp.push(temp);
      });
      this.mensajeList = mensajeList_temp;
      console.log(this.mensajeList)
    })
    
  }

  // Obtener los nombre de Receptor
  obtenerNombreReceptor(){
    if(this.receptor.tipo){
      this.userService.askUserData({id: this.receptor.id}).subscribe(data => {
        if(data.formularios.rows.length() > 0){
          this.receptor.nombre = data.formularios.rows[0].Nombre;
        }
      })
    }else{
      this.collabService.askColabData({id: this.receptor.id}).subscribe(data => {
        if(data.formularios.rows.length() > 0){
          this.receptor.nombre = data.formularios.rows[0].Nombre;
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
  terminarContrato(id){
    
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

}
