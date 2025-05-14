import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Cuenta } from 'src/app/models/cuenta.model';
import { CuentaService } from 'src/app/services/cuenta/cuenta.service';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.scss'
})
export class EditarPerfilComponent {
  form!: FormGroup;
  editMode: boolean = false;
  cuentaId!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cuentaService: CuentaService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.cuentaId = id;
        this.editMode = true;
        this.getCuentaById(id);
      }
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  getCuentaById(id: string): void {
    this.cuentaService.getCuenta(id).subscribe({
      next: (cuenta: Cuenta) => {
        this.form.patchValue({
          nombre: cuenta.nombre,
          nombreUsuario: cuenta.nombreUsuario,
          email: cuenta.email,
          password: '' 
        });
      },
      error: () => {
        console.log('Error al cargar datos del usuario');
      }
    });
  }

  guardarCambios(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    alert('Por favor completa todos los campos correctamente');
    return;
  }

  console.log('Formulario válido. Datos a enviar:', this.form.value); 

  const cuentaData: Cuenta = this.form.value;

  if (this.editMode && this.cuentaId) {
    console.log('Edit mode activado. ID:', this.cuentaId); 

    this.cuentaService.updateCuenta(this.cuentaId, cuentaData).subscribe({
      next: () => {
        console.log('Perfil actualizado correctamente'); 
        alert('Perfil actualizado correctamente');
        this.router.navigate(['/perfil']);
      },
      error: (err) => {
        console.error('Error al actualizar el perfil:', err); 
        alert('Ocurrió un error al actualizar el perfil');
      }
    });
  } else {
    console.warn('No se cumple editMode o no hay cuentaId'); 
  }
}

}
