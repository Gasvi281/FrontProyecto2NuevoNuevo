import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { Cuenta } from 'src/app/models/cuenta.model';
import { CuentaService } from 'src/app/services/cuenta/cuenta.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditarProductosModalComponent } from 'src/app/components/editar-productos-modal/editar-productos-modal.component';


@Component({
  selector: 'perfil',
  imports: [MaterialModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  cuenta: Cuenta;


  preferencias: string[] = [];
  impedimentos: string[] = [];

  constructor(private cuentaService: CuentaService, private Router: Router, private dialog: MatDialog) {}

  ngOnInit() {
    this.getCuenta();
  }

  getCuenta() {
    const id = localStorage.getItem('id') || '';
    this.cuentaService.getCuenta(id).subscribe({
      next: (res: any) => {
        this.cuenta = res;

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

  desactivarCuenta(){
    const id = localStorage.getItem('id') || '';
    this.cuentaService.desactivarCuenta(id).subscribe({
      next: (res)=>{
        alert("Cuenta desactivada exitosamente");
        this.Router.navigate(['/authentication/login'])
      }, 
      error: (err)=>{
        alert("error, no se pudo desactivar");
        console.log(err);
      }
    })
  }

  goToEditarPerfil(id: string): void {
    this.Router.navigate(['/perfil/editar', id]);
  }

  abrirModal(tipo: 'preferencias' | 'impedimentos'): void {
  const dialogRef = this.dialog.open(EditarProductosModalComponent, {
    data: {
      cuentaId: this.cuenta.id,
      tipo
    },
    width: '500px'
  });

  dialogRef.afterClosed().subscribe((resultado) => {
      this.getCuenta(); 
  });
}

}
