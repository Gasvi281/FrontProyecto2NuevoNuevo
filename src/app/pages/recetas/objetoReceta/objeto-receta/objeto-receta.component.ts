import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { IngredientesReceta } from 'src/app/models/ingredientesReceta.model';
import { RecetaService } from 'src/app/services/receta/receta.service';

@Component({
  selector: 'app-objeto-receta',
  imports: [MaterialModule, CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './objeto-receta.component.html',
  styleUrl: './objeto-receta.component.scss'
})
export class ObjetoRecetaComponent {
  form!: FormGroup;
  objetoRecetaNombre: string;
  ingredientes: IngredientesReceta[] = []

  constructor( private recetaService: RecetaService,
     private route: ActivatedRoute, 
     private fb: FormBuilder){}

  initForm(){
    this.form = this.fb.group({
          nombre:['', Validators.required],
          dificultad:['', Validators.required],
          categoria:['', Validators.required]
        })
  }
  
  ngOnInit(){
    this.initForm();

    this.route.paramMap.subscribe(params=>{
      const nombre = params.get('nombre');
      if(nombre){
        this.objetoRecetaNombre = nombre;
        this.getRecetaByNombre(nombre);
      }
    })  
  }

  getRecetaByNombre(nombre: string){
    this.recetaService.getRecetaByNombre(nombre).subscribe({
      next: (res)=>{
        this.form.patchValue({
          nombre: res.nombre,
          dificultad: res.dificultad,
          categoria: res.Categoria,
        });
        this.ingredientes = res.ingredientes || [];
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
}
