import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
  recetaId: string;
  estadoReceta: string;
  ingredientes: IngredientesReceta[] = []

  constructor( private recetaService: RecetaService,
    private router: Router,
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
      const recetaId = params.get('id');
      if(recetaId){
        this.recetaId = recetaId;
        this.getRecetaById(recetaId);
      }
    })  
  }

  getRecetaById(id: string){
    this.recetaService.getRecetaById(id).subscribe({
      next: (res)=>{
        this.recetaId = res.id || '';
        this.form.patchValue({
          nombre: res.nombre,
          dificultad: res.dificultad,
          categoria: res.Categoria,
        });
        this.estadoReceta = res.estado ||'';
        this.ingredientes = res.ingredientes || [];
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  goToEditarReceta(id: string){
    this.router.navigate(['/recetas/receta/editar', id]);
  }
}
