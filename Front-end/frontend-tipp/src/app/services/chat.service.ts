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
export class ChatService {

  constructor(private http:HttpClient) { }

  getCitasbyCollab(data): Observable<any>{
    let url = dominio + "getAdmin";
    return this.http.post(url, data, httpHeaders);
  }
  getCitasbyUser(data): Observable<any> {
    let url = dominio + "getCitasForUser";
    return this.http.post(url, data, httpHeaders)
  }
  getMensajes(data): Observable<any> {
    let url = dominio + "getMessages";
    return this.http.post(url, data, httpHeaders);
  }
  sendMensajes(data): Observable<any>{
    let url = dominio + "sendMessage";
    return this.http.post(url, data, httpHeaders);
  }
}
