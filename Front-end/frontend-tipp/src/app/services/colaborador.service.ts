import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const dominio = environment.apiURL;
const httpHeaders = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  constructor( private http:HttpClient ) { }
  

    //----------------colaborador----------------------

  //-----------loin-register---------------------------
  sentColRegiser(data):Observable<any>{
    
    let url = dominio + '/newColab';
    return this.http.post(url, data, httpHeaders);
  }
  
  // Obtener todas la etiquetas para el registro
  getEtiquetas(): Observable<any> {
    let url = dominio + '/getEtiquetas';
    return this.http.post(url, httpHeaders);
  };

  // Obtener ID de un correo en especifico 
  getIdByEmail(data): Observable<any> {
    let url = dominio + 'getCollabIdByEmail';
    return this.http.post(url, data, httpHeaders);
  }

  //Linkear las etiquetas con el colaborador
  setCollabTags(data): Observable<any> {
    let url = dominio + '/setTagsForCollab';
    return this.http.post(url, data, httpHeaders);
  };

}
