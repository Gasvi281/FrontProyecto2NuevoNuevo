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

    updateCuenta(id: string, cuenta: Cuenta): Observable<any> {
        const endpoint = `${this.api_url}/${id}`;
        const headers = {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
        };
        return this.http.put(endpoint, cuenta, { headers });
    }

    agregarPreferencia(cuentaId: string, productoId: string) {
        const endpoint = `${this.api_url}/pref/${cuentaId}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
        };
        return this.http.post(endpoint, { productoId }, { headers });
    }

    eliminarPreferencia(cuentaId: string, productoId: string) {
        const endpoint = `${this.api_url}/pref/${cuentaId}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
        };
        return this.http.put(endpoint, { productoId }, { headers });
    }

    agregarImpedimento(cuentaId: string, productoId: string) {
        const endpoint = `${this.api_url}/imp/${cuentaId}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
        };
        return this.http.post(endpoint, { productoId }, { headers });
    }

    eliminarImpedimento(cuentaId: string, productoId: string) {
        const endpoint = `${this.api_url}/imp/${cuentaId}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
        };
        return this.http.put(endpoint, { productoId }, { headers });
    }

    desactivarCuenta(cuentaId: string) {
        const endpoint = `${this.api_url}/cambiarEstado/${cuentaId}`;
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`
        };
        return this.http.put(endpoint, {}, { headers });
    }

}
