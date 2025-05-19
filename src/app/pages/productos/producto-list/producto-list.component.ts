import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-list',
  imports: [MaterialModule, CommonModule],
  templateUrl: './producto-list.component.html',
  styleUrl: './producto-list.component.scss'
})
export class ProductoListComponent {
  listaProductos: Producto[]=[];
  
  constructor(private productoService: ProductoService, private router: Router){
      
  
    }

  ngOnInit(){
    this.getProductos();
  }

  getProductos(){
    this.productoService.getProductos().subscribe({
      next:(res)=>{
        this.listaProductos = res;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  navegarProducto(id?: string){
    if(id){
      this.productoService.getProductoById(id).subscribe({
        next:(res: Producto) =>{
          if(res.estado==='Inactivo'){
            alert('Producto inhabilitado')
          }
          else{
            this.router.navigate(['productos/producto',id])
          }
        },
        error:(err)=>{
          console.log(err)
        }
      })
    }
  }

  crearProducto(){
    this.router.navigate(['productos/crear'])
  }

  editarProducto(id?: string){
    if(id){
      this.router.navigate(['productos/editar',id])
    }
  }
}
