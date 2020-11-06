import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const dominio = environment.apiURL;
const httpHeaders = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
class iD{
  id:Number
}

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  constructor( private http:HttpClient ) { }
  

  //----------------colaborador------------------------
  askColabData(data):Observable<any>{ 
    let id = new iD();
    id.id = data;
    let url = dominio + 'getColaboradoresData';
    return this.http.post(url, id, httpHeaders);
  }

  updateColabData(data):Observable<any>{
    let url = dominio + 'updateColaboradorData';
    return this.http.post(url, data, httpHeaders);
  }

  cambiarEstado(data):Observable<any>{
    let url = dominio+'cambiarEstadoColab';
    console.log(data);
    return this.http.post(url, data, httpHeaders);
  }

  getColaboradoresEstado(data):Observable<any>{
    let url = dominio+'getColaboradoresEstado';
    console.log(data);
    return this.http.post(url, data, httpHeaders);
  }


  //-----------loin-register---------------------------
  sentColRegiser(data):Observable<any>{
    
    let url = dominio + 'newColab';
    return this.http.post(url, data, httpHeaders);
  }

  sentLoginColab(datos): Observable<any>{
    console.log(datos);
    let url = dominio + 'getColaboradores';
    return this.http.post(url, datos, httpHeaders); 
  }

  isLogin() {
    let islog = localStorage.getItem("isLogin") === "valido";
    return islog;
  }

  loged(){
    localStorage.setItem("isLogin", "valido");
  }
  
  // Obtener todas la etiquetas para el registro
  getEtiquetas(): Observable<any> {
    let url = dominio + 'getEtiquetas';
    return this.http.get(url, httpHeaders);
  };

  // Obtener ID de un correo en especifico 
  getIdByEmail(data): Observable<any> {
    let url = dominio + 'getCollabIdByEmail';
    return this.http.post(url, data, httpHeaders);
  }

  //Linkear las etiquetas con el colaborador
  setCollabTags(data): Observable<any> {
    let url = dominio + 'setTagsForCollab';
    return this.http.post(url, data, httpHeaders);
  };

}
