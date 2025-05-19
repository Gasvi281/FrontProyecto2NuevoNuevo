import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Comentario } from 'src/app/models/comentario.model';
import { ComentarioService } from 'src/app/services/comentario/comentario.service';

@Component({
  selector: 'app-comentario',
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.scss'
})
export class ComentarioComponent {
  comentarios: Comentario[]=[];

  constructor(private comentarioService: ComentarioService, public router: Router) {

  }

  ngOnInit(){
    this.getComentarios();
  }

  getComentarios(){
    this.comentarioService.getComentarios().subscribe({
      next:(res)=>{
        this.comentarios = res;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  crearComentario(){
    this.router.navigate(['comentarios/crear'])
  }

  editarComentario(id?: string){
    if(id){
      this.router.navigate(['comentarios/editar',id])
    }
  }
}
