import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formulario.service';

@Component({
  selector: 'app-usermenu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.scss']
})
export class UsermenuComponent implements OnInit {
  name_tags: FormGroup;
  modo: string;

  constructor(private router: Router, private fb: FormBuilder, public auth:FormularioService) { }
  userDisplayName = '';
  ngOnInit(): void {
    this.modo = "mapa";

    this.name_tags = this.fb.group({
      string: [""],
    });
    this.userDisplayName = localStorage.getItem('loggedUser');
  }




  buscarColaboradores(){
    this.modo = "buscador";
    let string: string;
    const params = new URLSearchParams(location.search);
    if(this.name_tags.value.string === ""){
      string = "";
    }else{
      string = this.name_tags.value.string;
    }
    params.set('string', string);
    window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);
  }

  modoMapa(){
    this.modo = "mapa";
  }

  abrir(ruta){
    this.router.navigateByUrl(ruta);  
  }
  
  irA(ruta){
    this.router.navigateByUrl(ruta);
  }
    
}
