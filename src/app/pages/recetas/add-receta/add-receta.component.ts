import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { ProductosAgregadosComponent } from '../../productos-agregados/productos-agregados.component';
import { AddProductoComponent } from '../../add-producto/add-producto.component';
import { IngredientesReceta } from 'src/app/models/ingredientesReceta.model';
import { Router } from '@angular/router';
import { RecetaService } from 'src/app/services/receta/receta.service';
import { Recetas } from 'src/app/models/receta.model';

@Component({
  selector: 'app-add-receta',
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule, ProductosAgregadosComponent, AddProductoComponent],
  templateUrl: './add-receta.component.html',
  styleUrl: './add-receta.component.scss'
})
export class AddRecetaComponent {
  ingredientesAgregados: IngredientesReceta[] =[];

  constructor(private router: Router, private recetaService: RecetaService){

  }

  formReceta = new FormGroup({
    nombre: new FormControl('', Validators.required),
    dificultad: new FormControl('', [Validators.required, Validators.min(1), Validators.max(5)]),
    categoria: new FormControl('', Validators.required),
  })

  addReceta(){
    if(this.formReceta.invalid){
      return;
    }

    const receta: Recetas = {
      nombre: this.formReceta.value.nombre!,
      dificultad: Number(this.formReceta.value.dificultad!),
      Categoria: this.formReceta.value.categoria!
    }

    const body = {
      nombre: receta.nombre,
      dificultad: receta.dificultad,
      Categoria: receta.Categoria,
      ingredientes: this.ingredientesAgregados
    }

    this.recetaService.addReceta(body).subscribe({
      next: (res)=>{
        alert("Receta registrada");
        this.router.navigate(['/recetas']);
      },
      error: (err)=>{
        alert("No se pudo registrar la receta");
        console.log(err);
      }
    })
  }

  CuandoSeAgregaUnIngrediente(obj: IngredientesReceta){
    this.ingredientesAgregados.push(obj);
  }

  eliminarIngrediente(ingrediente: IngredientesReceta) {
  this.ingredientesAgregados = this.ingredientesAgregados.filter(i => i !== ingrediente);
  }
}
