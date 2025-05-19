import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Recetas } from 'src/app/models/receta.model';
import { Observable } from 'rxjs';
import { IngredientesReceta } from 'src/app/models/ingredientesReceta.model';

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
    const endpoint = `${this.apiUrl}/nombre/${nombre}`;
    const token = localStorage.getItem('AuthToken');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.httpClient.get<Recetas>(endpoint, {headers});
  }

  getRecetaById(id: string){
    const endpoint = `${this.apiUrl}/id/${id}`;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('AuthToken')}`
    });
    return this.httpClient.get<Recetas>(endpoint, {headers});
  }

  editarReceta(recetaId: string, cambiosReceta: Recetas){
    const endpoint = `${this.apiUrl}/${recetaId}`
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('AuthToken')}`
    });
    return this.httpClient.put<Recetas>(endpoint, cambiosReceta, {headers});
  }

  changeRecetaStatus(recetaId: string, estado: string){
    const endpoint = `${this.apiUrl}/desactivar/${recetaId}`
    const headers = new HttpHeaders({
      'Content-Type':"application/json",
      Authorization: `Bearer ${localStorage.getItem('AuthToken')}`
    });
    const body ={estado}
    return this.httpClient.put(endpoint, body, {headers});
  }

  addReceta(body: any): Observable<any>{
    const endpoint = `${this.apiUrl}`
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('AuthToken')}`
    });
    return this.httpClient.post(endpoint, body, {headers});
  }
}
