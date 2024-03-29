import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


const dominio = environment.apiURL;
const httpHeaders = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}
class ID{
  id:Number 
}
@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  constructor(private http:HttpClient) { }

//---------------usuarios---------------------------
  askUserData(id): Observable<any>{
    let iD:ID = new ID();
    iD.id = id;
    let url = dominio + 'getUsuariosData';
    return this.http.post(url, iD, httpHeaders);
  }

  updateUserData(data): Observable<any> {
    let url = dominio + 'updateUserData';
    return this.http.post(url, data, httpHeaders);
  }

  getCitas(data):Observable<any> {
    let url = dominio + 'getCitasUser';
    return this.http.post(url, data, httpHeaders);
  }

  getColabData(data):Observable<any>{
    let url = dominio+'getColabNombre';
    return this.http.post(url, data, httpHeaders);
  }

  getContratoInfo(data):Observable<any>{
    let url = dominio+'getColabNombre';
    return this.http.post(url, data, httpHeaders);
  }

  setUbicacionActual(data): Observable<any>{
    let url = dominio + "setMyPositionUser";
    return this.http.post(url, data, httpHeaders); 
  }

  //Obtener Ubicacion via ID
  getUserUbicacioByID(data): Observable<any>{
    let url = dominio + "getUserUbicacionByID";
    return this.http.post(url, data, httpHeaders);
  }  

  calificarColab(data): Observable<any>{
    let url = dominio + "calificarColab";
    return this.http.post(url, data, httpHeaders);
  }

  completarContrato(data): Observable<any>{
    let url = dominio+ "completarContrato";
    return this.http.post(url, data, httpHeaders);
  }
//-----------loin-register---------------------------
  sentLogin(datos): Observable<any>{
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

  getEtiquetas(): Observable<any>{
    let url = dominio + 'getEtiquetas';
    return this.http.post(url, httpHeaders);
  }

  //----------Hacer un contrato ------------------------
  newContrato(data): Observable<any>{
    let url = dominio + 'newContrato';
    console.log("service " + data.fecha_inicio);
    return this.http.post(url, data, httpHeaders);
  }

  getFechayHora(): Observable<any>{
    let url = dominio + 'getFyH';
    return this.http.post(url, httpHeaders);
  }

}


