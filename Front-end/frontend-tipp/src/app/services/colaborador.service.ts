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



  // Codigo para la busqueda de colaboradores
  searchColaboradores(data): Observable<any>{
    let url = dominio + 'getCollabo';
    return this.http.post(url, data, httpHeaders);
  }


}
