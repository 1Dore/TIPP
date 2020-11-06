import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formulario.service';


@Component({
  selector: 'app-lista-de-colaboradores',
  templateUrl: './lista-de-colaboradores.component.html',
  styleUrls: ['./lista-de-colaboradores.component.scss']
})

export class ListaDeColaboradoresComponent implements OnInit {


  constructor(private router: Router, private servicio:FormularioService ) { }

  ngOnInit(): void {
  }


}
