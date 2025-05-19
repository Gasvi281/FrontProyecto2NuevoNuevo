import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from 'src/app/models/comentario.model';
import { Cuenta } from 'src/app/models/cuenta.model';


@Injectable({
    providedIn: 'root'
})
export class ComentarioService {
    private api_url = 'http://localhost:3000/comentario'

    constructor(private http: HttpClient) { }

    addComentario(comentario: Comentario, id: string): Observable<any> {
        const endpoint = `${this.api_url}/CreateComment/${id}`;
        const headers = {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
        }
        return this.http.post(endpoint, comentario, {headers});
      }

    getComentarios(): Observable<Comentario[]> {
        const endpoint = `${this.api_url}/`;
        const headers = {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
        }
        return this.http.get<Comentario[]>(endpoint, { headers });
    }

}
