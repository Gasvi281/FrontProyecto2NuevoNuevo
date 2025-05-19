import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Recetas } from 'src/app/models/receta.model';
import { RecetaService } from 'src/app/services/receta/receta.service';

@Component({
  selector: 'app-receta-form',
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './receta-form.component.html',
  styleUrl: './receta-form.component.scss'
})
export class RecetaFormComponent {
  form!: FormGroup;
  recetaId: string;
  
  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private recetaService: RecetaService, 
    private fb: FormBuilder){
  }

  initForm():void{
    this.form = this.fb.group({
      nombre:['', Validators.required],
      dificultad:['', [Validators.required, Validators.min(1), Validators.max(5)]],
      Categoria: ['', Validators.required]
    })
  }

  ngOnInit(): void{
    this.initForm();

    this.route.paramMap.subscribe(params=>{
      const id = params.get('id');
      if(id){
        this.recetaId = id;
        this.getRecetaById(id);
      }
    })
  }

  getRecetaById(id: string){
    this.recetaService.getRecetaById(id).subscribe({
       next: (receta: Recetas)=>{
        this.form.patchValue({
          nombre: receta.nombre,
          dificultad: receta.dificultad,
          Categoria: receta.Categoria
        })
       },
       error: (err)=>{
        console.log(err);
       }
    })
  }

  modificarReceta(){
    if(this.form.invalid){
      this.form.markAllAsTouched();
      alert("Error al mapear, asegurese de tener todos los datos")
      return
    }

    const cambiosReceta: Recetas = this.form.value;

    if(this.recetaId){
      this.recetaService.editarReceta(this.recetaId, cambiosReceta).subscribe({
        next:(receta: Recetas)=>{
          alert("Se modifico la receta correctamente");
          this.router.navigate(['/recetas']);
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }
}
