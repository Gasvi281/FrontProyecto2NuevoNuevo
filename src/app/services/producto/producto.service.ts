import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private api_url='http://localhost:3000/producto'
  
    constructor(private http: HttpClient) { }
  
    getProductos():Observable<Producto[]>{
      const endpoint= `${this.api_url}/`;
      const headers = {
        'Content-Type':"application/json",
        'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
      }
      return this.http.get<Producto[]>(endpoint, {headers}) ;
    }

    getProductoById(id: string){
      const endpoint= `${this.api_url}/${id}`;
      const headers = {
        'Content-Type':"application/json",
        'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
      }
      return this.http.get<Producto>(endpoint, {headers})
    }
}
