import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { Cuenta } from 'src/app/models/cuenta.model';
import { CuentaService } from 'src/app/services/cuenta/cuenta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'perfil',
  imports: [MaterialModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  cuenta: Cuenta;

  // Arreglos que usaremos en el HTML
  preferencias: string[] = [];
  impedimentos: string[] = [];

  constructor(private cuentaService: CuentaService, private Router: Router) {}

  ngOnInit() {
    this.getCuenta();
  }

  getCuenta() {
    const id = localStorage.getItem('id') || '';
    this.cuentaService.getCuenta(id).subscribe({
      next: (res: any) => {
        this.cuenta = res;

        // 🔄 Mapeamos los nombres de productos desde la estructura anidada
        this.preferencias = (res.preferencias || []).map((p: any) => p.producto?.nombreProducto ?? '[Sin nombre]');
        this.impedimentos = (res.impedimentos || []).map((i: any) => i.producto?.nombreProducto ?? '[Sin nombre]');

        console.log('Preferencias:', this.preferencias);
        console.log('Impedimentos:', this.impedimentos);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  goToEditarPerfil(id: string): void {
    this.Router.navigate(['/perfil/editar', id]);
  }
}
