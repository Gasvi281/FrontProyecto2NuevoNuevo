import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recetas } from 'src/app/models/receta.model';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  private apiUrl = 'http://localhost:3000/receta'; 

  constructor(private httpClient: HttpClient) { } 

  getRecetas(){
    const token = localStorage.getItem('AuthToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.httpClient.get<Recetas[]>(this.apiUrl, {headers});
  }

  getRecetaByNombre(nombre: string){
    const endpoint = `${this.apiUrl}/${nombre}`;
    const token = localStorage.getItem('AuthToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.httpClient.get<Recetas>(endpoint, {headers});
  }
}
