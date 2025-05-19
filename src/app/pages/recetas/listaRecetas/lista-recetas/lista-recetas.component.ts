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

  navegarReceta(id: string){
    if(id){
      this.recetaService.getRecetaById(id).subscribe({
        next: (res: Recetas)=>{
          if(res.estado === 'Inactivo'){
            alert("Lo sentimos, esta receta esta desactivada");
          } else{
            this.router.navigate(['/recetas/receta/objeto', id]);
          }
        },
        error: (err)=>{
          console.log(err);
        }
      })
    }
  }

  navegarAgregarReceta(){
    this.router.navigate(['/recetas/receta/add']);
  }

  changeRecetaStatus(receta: Recetas){
    const recetaId = receta.id;
    const estado = receta.estado === "Activo" ? "Inactivo": "Activo";
    this.recetaService.changeRecetaStatus(recetaId || '', estado).subscribe({
      next: ()=>{
        alert("Se ha cambiado el estado de la receta");
        this.getRecetas();
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
}
