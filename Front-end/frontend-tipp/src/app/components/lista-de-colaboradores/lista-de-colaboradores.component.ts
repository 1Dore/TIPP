import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formulario.service';

class etiqueta{
  nombre: string;
  id: number;
}

class id{
  id: number;
}

class colaborador{
  id: number;
  nombre: string;
  etiquetas: Array<etiqueta>;
  foto: string;
  correo: string;
}
class Contrato{
  u_id:Number;
  c_id:Number;
  fecha_inicio:String;
}

@Component({
  selector: 'app-lista-de-colaboradores',
  templateUrl: './lista-de-colaboradores.component.html',
  styleUrls: ['./lista-de-colaboradores.component.scss']
})
export class ListaDeColaboradoresComponent implements OnInit {
  stringList: Array<string>;
  query:string;
  lista_collabs: Array<colaborador> = new Array<colaborador>();
  collabs_ids: Array<id> = new Array<id>();
  encontrados: boolean;

  constructor(private router: Router, private servicio:FormularioService ) { }

  ngOnInit(): void {

    const params = new URLSearchParams(window.location.search);
    if(params.get('string') == ""){
      this.query = "c_id IS NOT NULL";
    }else{
      this.stringList = params.get('string').split(" ");
      this.generarConsulta();

    }
    
    this.buscarCollabsIDs();
  }

  buscarCollabsIDs(){
   let temp: Array<id> = new Array<id>();
    this.servicio.searchColaboradoresIDs({where: this.query}).subscribe((rows) => {
      
      if(rows.formularios.rows.length > 0){
        this.encontrados = true;
        rows.formularios.rows.forEach((id) => {
          this.getCollabInfo(Number(id.c_id));
        });
      }else{
        this.encontrados = false;
      }
    });
    this.collabs_ids = temp;
  }

  getCollabInfo(id: number){
    let temp: colaborador = new colaborador();
    this.servicio.getCollabInfo({id: id}).subscribe((rows) => {
      rows.formularios.rows.forEach((info) => {
        temp.id = id;
        temp.nombre = info.nombre;
        temp.nombre += " " + info.apellido;
        temp.foto = info.c_foto;
        temp.correo = info.correo;
        temp.etiquetas = this.getCollabTags(id);
        this.lista_collabs.push(temp);
      });
    });
  }

  getCollabTags(id: number){
    let temp_list: Array<etiqueta> = new Array<etiqueta>(); 
    
    this.servicio.getCollabTags({id: id}).subscribe((tags) => {
      if(tags.formularios.rows.length > 0){
        tags.formularios.rows.forEach((tag) => {
          let temp: etiqueta = new etiqueta();
          temp.nombre = tag.e_nombre;
          temp.id = tag.e_id;
          temp_list.push(temp);
        });
      }
    });
    return temp_list;
  }

 getInfoFromID(){
   this.collabs_ids.forEach(id => {

   });
 }

  generarConsulta(){
    let primero:boolean = true;
    this.stringList.forEach(str => {
      if(primero){
        this.query = 'col.nombre =' + '\'' + str + '\'';
        this.query += ' OR col.apellido =' + '\'' + str + '\'';
        this.query += ' OR e.e_nombre =' + '\'' + str + '\'';
        primero = false;
      }else{
        this.query += ' OR col.nombre =' + '\'' + str + '\'';
        this.query += ' OR col.apellido =' + '\'' + str + '\'';
        this.query += ' OR e.e_nombre =' + '\'' + str + '\'';
      }
      
    });
  }

  contratar(id){
    //aqui obtendria los datos del card
    this.servicio.getFechayHora().subscribe(data => {
      console.log(data);
      let contrato = new Contrato();
      contrato.c_id = id; //id del colaborador
      contrato.u_id = Number(localStorage.getItem('id')); //id del usuario
      let fecha_inicio = new Date(data.formularios.rows[0].fyh);
      contrato.fecha_inicio = String(fecha_inicio);
      this.nextContrato(contrato);
    });
  }

  nextContrato(contrato:Contrato){
    this.servicio.newContrato(contrato).subscribe(data => {
      if (data.message == "Se creo un contrato satisfactoriamente"){
        alert("Contrato creado");
        this.router.navigateByUrl("user-contrato");
      }
    })
  }

}
