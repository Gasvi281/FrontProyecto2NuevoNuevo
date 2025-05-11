import { Component } from '@angular/core';
import { ListaCompraService } from 'src/app/services/listaCompra/listaCompra.service';
import { ProductoLista } from 'src/app/models/productosLista.model';
import { ListaCompra } from 'src/app/models/lista.model';

@Component({
  selector: 'app-lista-compra',
  templateUrl: './lista-compra.component.html',
  styleUrls: ['./lista-compra.component.scss']
})
export class ListaCompraComponent {
    listaCompra: ListaCompra;

    constructor(private listaCompraService: ListaCompraService){

    }

    ngOnInit(){
      this.getListaById();
    }

    getListaById(){
      const cuentaId = localStorage.getItem('id') || '';
      this.listaCompraService.getListaById(cuentaId).subscribe({
        next: (res)=>{
          this.listaCompra = res;
        },
        error: (err)=>{
          console.log(err);
        }
      })
    }
}
