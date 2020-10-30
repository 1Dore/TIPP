import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formulario.service';
import { ViewChild, ElementRef } from '@angular/core';
import { google } from 'google-maps';

declare var google: any;

@Component({
  selector: 'app-lista-de-colaboradores',
  templateUrl: './lista-de-colaboradores.component.html',
  styleUrls: ['./lista-de-colaboradores.component.scss']
})

export class ListaDeColaboradoresComponent implements OnInit {

  @ViewChild('map', {read: ElementRef, static: false}) mapRef:ElementRef;

  constructor(private router: Router, private servicio:FormularioService ) { }
  map: google.maps.Map;

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void{
    let location = new google.maps.LatLng(14.553979, -90.459848);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  }


}
