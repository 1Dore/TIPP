import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formulario.service';
import { ViewChild, ElementRef } from '@angular/core';
import { google } from 'google-maps';

@Component({
  selector: 'app-lista-de-colaboradores',
  templateUrl: './lista-de-colaboradores.component.html',
  styleUrls: ['./lista-de-colaboradores.component.scss']
})

export class ListaDeColaboradoresComponent implements OnInit {

  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;
  constructor(private router: Router, private servicio:FormularioService ) { }
  map: google.maps.Map;

  ngOnInit(): void {
  }


}
