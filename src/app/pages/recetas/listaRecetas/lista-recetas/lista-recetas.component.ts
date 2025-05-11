import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Router } from '@angular/router';
import { RecetaService } from 'src/app/services/receta/receta.service';
import { Recetas } from 'src/app/models/receta.model';

@Component({
  selector: 'app-lista-recetas',
  imports: [MaterialModule, CommonModule, RouterModule],
  templateUrl: './lista-recetas.component.html',
  styleUrl: './lista-recetas.component.scss'
})
export class ListaRecetasComponent {
  listaRecetas: Recetas[]=[];

  constructor(private recetaService: RecetaService, private router: Router){}

  ngOnInit(){
    this.getRecetas();
  }

  getRecetas(){
    this.recetaService.getRecetas().subscribe({
      next:(res)=>{
        this.listaRecetas = res;
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  navegarReceta(nombre?: string){
    if(nombre){
      this.router.navigate(['/recetas/receta', nombre]);
    }
  }
}
