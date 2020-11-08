import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formulario.service';

class citas{
  nombre:String
  descripcion:String
  contrato_id:Number
  estado:String
  c_id:Number
  telefono:String
  ocupacion:String
  etiquetas:Array<Etiqueta>
}

class estado{
  id:Number
  estado:String
  display:String
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
  listaCitas:Array<citas> = new Array<citas>();
  datosEstado:estado;
  citas = false;

  ngOnInit(): void {
    this.datosEstado = new estado();
    this.datosEstado.id = Number(localStorage.getItem('id'));
    this.userDisplayName = localStorage.getItem('loggedUser');
    this.obtenerCitas();
  }


  obtenerCitas(){



    this.auth.getCitas(this.datosEstado).subscribe(data => {

      if(data.formularios.rowCount > 0){
        let temp:citas = new citas();
        this.citas = true;
        data.formularios.rows.forEach((info) => {
          temp.contrato_id = info.con_id;
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
          temp.c_id = info.c_id;
        
          this.auth.getColabData(temp).subscribe(data => {
            temp.nombre = data.formularios.rows[0].nombre + " "+data.formularios.rows[0].apellido;
    
            temp.telefono = data.formularios.rows[0].telefono;
            temp.etiquetas = new Array<Etiqueta>();
    
    
            this.auth.getCollabTags({id:temp.c_id}).subscribe((tags) => {
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


    });
    console.log(this.listaCitas);
  }

  irAlChat(contrato_id: number, c_id: number){
    this.irA('/user-collab/chat?con_id=' + contrato_id + '&c_id=' + c_id);
  }

  irA(ruta){
    this.router.navigateByUrl(ruta);
  }

}
