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

//---------------usuarios---------------------------

//-----------loin-register---------------------------
  sentLogin(datos): Observable<any>{
    console.log(datos);
    let url = dominio + 'getUsuarios';
    return this.http.post(url, datos, httpHeaders); 
  }

  sentRegister(datos): Observable<any>{
    let url = dominio + 'newUsuario';
    return this.http.post(url, datos, httpHeaders);
  }

  isLogin() {
    let islog = localStorage.getItem("isLogin") === "valido";
    return islog;
  }

  loged(){
    localStorage.setItem("isLogin", "valido");
  }

  //-----------barra buscadora--------------------------
  searchColaboradoresIDs(data): Observable<any>{
    let url = dominio + 'getCollabsIDs';
    return this.http.post(url, data, httpHeaders);
  }

  getCollabInfo(data): Observable<any>{
    let url = dominio + 'getCollabInfo';
    return this.http.post(url, data, httpHeaders);
  }

  getCollabTags(data): Observable<any>{
    let url = dominio + 'getCollabTags';
    return this.http.post(url,data, httpHeaders)
  }

  //-----------buscar por categoria---------------------


  //----------Hacer un contrato ------------------------
  newContrato(data): Observable<any>{
    let url = dominio + 'newContrato';
    return this.http.post(url, data, httpHeaders);
  }

}


