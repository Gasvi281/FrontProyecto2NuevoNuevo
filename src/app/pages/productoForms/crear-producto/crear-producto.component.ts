import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto/producto.service';

@Component({
  selector: 'app-crear-producto',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './crear-producto.component.html',
  styleUrl: './crear-producto.component.scss'
})
export class CrearProductoComponent {
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productoService: ProductoService,
    private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      nombreProducto: ['', Validators.required],
      categoria: ['', Validators.required],
    });
  }

  addProducto() {

    const producto: Producto = {
      nombreProducto: this.form.value.nombreProducto!,
      categoria: this.form.value.categoria!,
    }

    this.productoService.addProducto(producto).subscribe({
      next: (res) => {
        alert("Producto creado correctamente");
        this.router.navigate(['/productos']);
      },
      error: (err) => {
        console.log(err);
        alert("Error al crear producto")
      }
    })
  }
}
