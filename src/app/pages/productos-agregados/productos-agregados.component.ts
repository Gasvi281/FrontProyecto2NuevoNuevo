import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { IngredientesReceta } from 'src/app/models/ingredientesReceta.model';

@Component({
  selector: 'app-productos-agregados',
  imports: [MaterialModule, CommonModule],
  templateUrl: './productos-agregados.component.html',
  styleUrl: './productos-agregados.component.scss'
})
export class ProductosAgregadosComponent {
  @Input() productosAgregados: IngredientesReceta[] = [];

   @Output() eliminarIngrediente = new EventEmitter<IngredientesReceta>();

  eliminarProducto(ingrediente: IngredientesReceta){
    this.eliminarIngrediente.emit(ingrediente);
  }
}
