import { Component } from '@angular/core';
import { ListaCompra } from 'src/app/models/lista.model';
import { ListaCompraService } from 'src/app/services/listaCompra/listaCompra.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-compra',
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './lista-compra.component.html',
  styleUrl: './lista-compra.component.scss'
})
export class ListaCompraComponent {
  listaCompra: ListaCompra;

  constructor(private listaCompraService: ListaCompraService, public router: Router) {

  }

  ngOnInit() {
    this.getListaById();
  }

  getListaById() {
    const cuentaId = localStorage.getItem('id') || '';
    this.listaCompraService.getListaById(cuentaId).subscribe({
      next: (res) => {
        this.listaCompra = res;
        console.log(res)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
