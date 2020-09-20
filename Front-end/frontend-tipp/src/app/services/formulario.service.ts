import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LoginFormulario } from '../components/login/LoginFormulario';

const dominio = environment.apiURL;
const httpHeaders = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
@Injectable({
  providedIn: 'root'
})

export class FormularioService {

  constructor(private http:HttpClient) { }


  sentLogin(datos:LoginFormulario): Observable<any>{
    let url = dominio + '/getUsuarios';
    return this.http.post(url, datos, httpHeaders); 
  }

  sentRegister(datos): Observable<any>{
    let url = dominio + '/newUsuario';
    return this.http.post(url, datos, httpHeaders);
  }

  sentColRegiser(data):Observable<any>{
    let url = dominio + '/newColab';
    return this.http.post(url, data, httpHeaders);
  }



  // Codigo para la busqueda de colaboradores
  searchColaboradoresIDs(data): Observable<any>{
    let url = dominio + 'getCollabsIDs';
    return this.http.post(url, data, httpHeaders);
  }

  getCollabInfo(data): Observable<any>{
    let url = dominio + 'getCollabInfo';
    return this.http.post(url, data, httpHeaders);
  }

  getCollabTags(data): Observable<any>{
    let url = dominio + 'getCollabTag';
    return this.http.post(url,data, httpHeaders)
  }
}


