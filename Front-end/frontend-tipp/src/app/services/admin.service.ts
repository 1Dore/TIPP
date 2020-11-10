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
export class AdminService {

  constructor( private http:HttpClient) { }

  loginAdmin(data): Observable<any>{
    let url = dominio + "getAdmin";
    return this.http.post(url, data, httpHeaders);
  }

  newEtiqueta(data): Observable<any> {
    let url = dominio + "newEtiquetas";
    return this.http.post(url, data, httpHeaders);
  }

  getAllEtiquetas(): Observable<any> {
    let url = dominio + "getAllEtiquetas";
    return this.http.post(url, httpHeaders);
  }

  editEtiqueta(data):Observable<any>{
    let url = dominio + "editarEtiquetas";
    return this.http.post(url, data, httpHeaders);
  }

  eliminarEtiqueta(data):Observable<any>{
    let url = dominio + "eliminarEtiqueta";
    return this.http.post(url, data, httpHeaders);
  }

}
