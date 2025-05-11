import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListaCompra } from 'src/app/models/lista.model';


@Injectable({
  providedIn: 'root'
})
export class ListaCompraService {  
  private api_url='http://localhost:3000/lista'

  constructor(private http: HttpClient) { }

  agregarProducto(cuentaId: string, productoId: string, cantidad: number): Observable<any>{
    const endpoint = `${this.api_url}/list/${cuentaId}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    const body ={
        productoId,
        cantidad
    }
    return this.http.post(endpoint, body, {headers})
  }

  getListaById(id: string){
    const endpoint = `${this.api_url}/${id}`;
    const headers = {
      'Content-Type':"application/json",
      'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
    }
    return this.http.get<ListaCompra>(endpoint, {headers})
  }
  
}