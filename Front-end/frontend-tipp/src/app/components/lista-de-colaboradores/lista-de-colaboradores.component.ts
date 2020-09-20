import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formulario.service';

@Component({
  selector: 'app-lista-de-colaboradores',
  templateUrl: './lista-de-colaboradores.component.html',
  styleUrls: ['./lista-de-colaboradores.component.scss']
})
export class ListaDeColaboradoresComponent implements OnInit {
  stringList: Array<string>;
  query:string;
  constructor(private router: Router, private servicio:FormularioService ) { }

  ngOnInit(): void {
    const params = new URLSearchParams(window.location.search);
    
    this.stringList = params.get('string').split(" ")
    console.log(this.stringList);
  
    
  }

  buscarColaboradores(){
    this.servicio
  }

  generarConsulta(){
    this.stringList.forEach(str => {
      this.query += 'col.nombre' + '\'' + str + '\'';
      this.query += 'col.apellido' + '\'' + str + '\'';
      this.query += 'e.e_nombre' + '\'' + str + '\'';
    });
  }

}
