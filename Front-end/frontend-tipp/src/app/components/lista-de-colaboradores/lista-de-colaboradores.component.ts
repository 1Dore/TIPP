import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formulario.service';

class etiqueta{
  nombre: string;
  id: number;
}

class colaborador{
  id: number;
  nombre: string;
  apellido: string;
  etiquetas: Array<etiqueta>;
  foto: string;
  correo: string;
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
  collabs_ids: Array<number> = Array<number>();
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
    this.collabs_ids.forEach((id) => {
      this.getCollabInfo(id);
    });
    
  }

  buscarCollabsIDs(){
    this.servicio.searchColaboradoresIDs({where: this.query}).subscribe((rows) => {
      if(rows.formularios.rows.length > 0){
        this.encontrados = true;
        rows.formularios.rows.forEach((id) => {
          this.collabs_ids.push(id.c_id);
        });
      }else{
        this.encontrados = false;
      }
    });
  }

  getCollabInfo(id: number){
    let temp: colaborador = new colaborador();
    this.servicio.getCollabInfo({id: id}).subscribe((rows) => {
      rows.formulario.rows.forEach((info) => {
        temp.id = id;
        temp.nombre = info.nombre;
        temp.apellido = info.apellido;
        temp.foto = info.c_foto;
        temp.correo = info.correo;
        temp.etiquetas = this.getCollabTags(id);
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

  generarConsulta(){
    this.stringList.forEach(str => {
      this.query += 'col.nombre' + '\'' + str + '\'';
      this.query += 'col.apellido' + '\'' + str + '\'';
      this.query += 'e.e_nombre' + '\'' + str + '\'';
    });
  }

}
