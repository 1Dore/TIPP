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


  ngOnInit(): void {
    this.datosEstado = new estado();
    this.datosEstado.id = Number(localStorage.getItem('id'));
    this.userDisplayName = localStorage.getItem('loggedUser');
    this.obtenerCitas();
  }


  obtenerCitas(){
    let temp:citas = new citas();


    this.auth.getCitas(this.datosEstado).subscribe(data => {
      console.log("data de getCitas: ")
      console.log(data);
      data.formularios.rows.forEach((info) => {
        temp.contrato_id = info.con_id;
        temp.estado = info.estado;
        temp.nombre = "";
        temp.c_id = info.c_id;
      });

      this.auth.getColabData(temp).subscribe(data => {
        console.log("data de getColabData: ")
        console.log(data);
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
      this.listaCitas.push(temp);
    });

    console.log(this.listaCitas);
  }


  irA(ruta){
    this.router.navigateByUrl(ruta);
  }

}
