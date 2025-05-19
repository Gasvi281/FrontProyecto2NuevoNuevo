import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Comentario } from 'src/app/models/comentario.model';
import { ComentarioService } from 'src/app/services/comentario/comentario.service';

@Component({
  selector: 'app-crear-comentario',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './crear-comentario.component.html',
  styleUrl: './crear-comentario.component.scss'
})
export class CrearComentarioComponent {
  form!: FormGroup;
  cuentaId= localStorage.getItem('id')

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private comentarioService: ComentarioService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      comentario: ['', Validators.required],
    });
  }

  addComentario() {
    const comentario: Comentario = {
      comentario: this.form.value.comentario!,
      cuentaId: this.cuentaId || '',
      fecha: new Date(),
    }

    this.comentarioService.addComentario(comentario, this.cuentaId || '').subscribe({
      next: (res) => {
        alert("comentario creado correctamente");

      },
      error: (err) => {
        console.log(err);
        alert("Error al crear comentario")
      }
    })
  }
}
