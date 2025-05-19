import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { IngredientesReceta } from 'src/app/models/ingredientesReceta.model';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { RecetaService } from 'src/app/services/receta/receta.service';

@Component({
  selector: 'app-add-producto',
  imports: [FormsModule, CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './add-producto.component.html',
  styleUrl: './add-producto.component.scss'
})
export class AddProductoComponent {
  productosL: Producto[] =[];

  @Output() ingredienteAgregado = new EventEmitter<IngredientesReceta>();

  constructor(private productoService: ProductoService){

  }

  form = new FormGroup({
    id: new FormControl('', Validators.required),
    cantidad: new FormControl(1, [Validators.required, Validators.min(1)])
  })

  ngOnInit(){
    this.getProductos();
  }

  getProductos(){
    this.productoService.getProductos().subscribe({
      next: (productos)=>{
        this.productosL = productos;
      },
      error: (err)=>{
        alert("Error, no se consiguieron los productos");
      }
    })
  }

  agregarIngrediente(){
    if(this.form.valid){
      const productoId = this.form.value.id;
      const prodSelec = this.productosL.find(p => p.id === productoId);
      if(prodSelec){
        const nuevoIngrediente: IngredientesReceta ={
          cantidad: this.form.value.cantidad?.toString() || '',
          producto: prodSelec
        }
        this.ingredienteAgregado.emit(nuevoIngrediente);
        this.form.reset({id: '', cantidad: 1});
      }
    }
  }
}
