import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormularioService } from 'src/app/services/formulario.service';

class Etiqueta{
  nombre: string;
  id: number;
}

class id{
  id: number;
}

class colaborador{
  id: number;
  nombre: string;
  etiquetas: Array<Etiqueta>;
  foto: string;
  correo: string;
}

class Contrato{
  u_id:Number;
  c_id:Number;
  fecha_inicio:String;
}

declare var google:any;

@Component({
  selector: 'app-usermenu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.scss']
})
export class UsermenuComponent implements OnInit {
  //cosas de google maps
  name_tags: FormGroup;
  modo: string;
  stringList: Array<string>;
  query:string;
  lista_collabs: Array<colaborador> = new Array<colaborador>();
  collabs_ids: Array<id> = new Array<id>();
  encontrados: boolean;
  map:any;

  //algo necesario para comunicarnos con el hmtl para el mapa
  @ViewChild('map', {read: ElementRef, static: false}) mapRef:ElementRef;

  constructor(private router: Router, private fb: FormBuilder, public auth:FormularioService) { }


  userDisplayName = '';

  
  ngOnInit(): void {
    this.modo = "mapa";
    this.name_tags = this.fb.group({
      string: [""],
    });
    this.userDisplayName = localStorage.getItem('loggedUser');
    const params = new URLSearchParams(location.search);
    params.set('string', '');
    window.history.replaceState({}, '', `${location.pathname}?${params.toString()}`);
    this.beginSearch();
    this.initMap();
  }

  //init mapa
  initMap(): void{
    let location = new google.maps.LatLng(14.553979, -90.459848);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
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
    this.beginSearch();
    
  }

  modoMapa(){
    this.modo = "mapa";
  }

  // CODIGO DE LA LISTA DE COLABORADORES
  
  buscarCollabsIDs(){
    let temp: Array<id> = new Array<id>();
     this.auth.searchColaboradoresIDs({where: this.query}).subscribe((rows) => {
       
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
    this.lista_collabs = new Array<colaborador>();
     let temp: colaborador = new colaborador();
     this.auth.getCollabInfo({id: id}).subscribe((rows) => {
       rows.formularios.rows.forEach((info) => {
         temp.id = id;
         temp.nombre = info.nombre;
         temp.nombre += " " + info.apellido;
         temp.foto = info.c_foto;
         temp.correo = info.correo;
         temp.etiquetas = new Array<Etiqueta>();
         this.auth.getCollabTags({id: id}).subscribe((tags) => {
           if(tags.formularios.rows.length > 0){
             tags.formularios.rows.forEach((tag) => {
               let etiqueta: Etiqueta = new Etiqueta();
               etiqueta.nombre = tag.e_nombre;
               etiqueta.id = tag.e_id;
               temp.etiquetas.push(etiqueta);
             });
           }
         });
         this.lista_collabs.push(temp);
       });
     });
   }
   
   beginSearch(){
    
    const params = new URLSearchParams(window.location.search);
    if(params.get('string') == ""){
      this.query = "col.c_id IS NOT NULL";
    }else{
      this.stringList = params.get('string').split(" ");
      this.generarConsulta();

    }
    
    this.buscarCollabsIDs();
   }
 
  getInfoFromID(){
    this.collabs_ids.forEach(id => {
 
    });
  }
 
   generarConsulta(){
     let primero:boolean = true;
     this.stringList.forEach(str => {
       if(primero){
         this.query = '(col.nombre =' + '\'' + str + '\'';
         this.query += ' OR col.apellido =' + '\'' + str + '\'';
         this.query += ' OR e.e_Nombre =' + '\'' + str + '\')';
         primero = false;
       }else{
         this.query += ' AND (OR col.nombre =' + '\'' + str + '\'';
         this.query += ' OR col.apellido =' + '\'' + str + '\'';
         this.query += ' OR e.e_Nombre =' + '\'' + str + '\')';
       }
       
     });
     console.log(this.query);
   }
 
   contratar(id){
     //aqui obtendria los datos del card
     this.auth.getFechayHora().subscribe(data => {
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
     this.auth.newContrato(contrato).subscribe(data => {
       if (data.message == "Se creo un contrato satisfactoriamente"){
         alert("Contrato creado");
         this.router.navigateByUrl("usermenu");
       }
     })
   }


  // FIN DEL CODIDIGO DE LA LISTA DE COLABORADORES

  abrir(ruta){
    this.router.navigateByUrl(ruta);  
  }
  
  irA(ruta){
    this.router.navigateByUrl(ruta);
  }
  
    
}
