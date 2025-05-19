import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-editar-producto',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './editar-producto.component.html',
  styleUrl: './editar-producto.component.scss'
})
export class EditarProductoComponent {
  form!: FormGroup;
  editMode: boolean = false;
  productoId!: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private fb: FormBuilder,) { }


  ngOnInit(): void {
    this.initForm();

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.productoId = id;
        this.editMode = true;
        this.getProductoById(id);
      }
    });
  }

  initForm(): void {
    this.form = this.fb.group({
      nombreProducto: ['', Validators.required],
      categoria: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  getProductoById(id: string): void {
    this.productoService.getProductoById(id).subscribe({
      next: (producto: Producto) => {
        this.form.patchValue({
          nombreProducto: producto.nombreProducto,
          categoria: producto.categoria,
        });
      },
      error: () => {
        console.log('Error al cargar datos del producto');
      }
    });
  }

  desactivarProducto(id: string, estado: string) {
    this.productoService.getProductoById(id).subscribe({
      next: (res: Producto) => {
        this.productoService.desactivarProducto(id, estado).subscribe({
          next: () => {
            console.log("no funciono")
            alert("Se ha cambiado el estado del producto");
            this.getProductoById(id);
          },
          error: () => {
            alert("Error al cambiar el estado del producto");
          }
        });
      }
    })
  }

  guardarCambios(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert('Por favor completa todos los campos correctamente');
      return;
    }

    console.log('Formulario válido. Datos a enviar:', this.form.value);

    const productoData: Producto = this.form.value;

    if (this.editMode && this.productoId) {
      console.log('Edit mode activado. ID:', this.productoId);

      this.productoService.updateProducto(this.productoId, productoData).subscribe({
        next: () => {
          console.log('Producto actualizado correctamente');
          alert('Producto actualizado correctamente');
          this.router.navigate(['/productos']);
        },
        error: (err) => {
          console.error('Error al actualizar el producto:', err);
          alert('Ocurrió un error al actualizar el producto');
        }
      });
    } else {
      console.warn('No se cumple editMode o no hay productoId');
    }
  }
}
