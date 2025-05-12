import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { CuentaService } from 'src/app/services/cuenta/cuenta.service';

@Component({
  selector: 'app-editar-productos-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  templateUrl: './editar-productos-modal.component.html',
  styleUrl: './editar-productos-modal.component.scss'
})
export class EditarProductosModalComponent implements OnInit {
  productos: any[] = [];
  seleccionados = new FormControl<string[]>([], { nonNullable: true });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { tipo: 'preferencias' | 'impedimentos', cuentaId: string },
    private dialogRef: MatDialogRef<EditarProductosModalComponent>,
    private productoService: ProductoService,
    private cuentaService: CuentaService
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (productosActivos) => {
        this.productos = productosActivos;

        this.cuentaService.getCuenta(this.data.cuentaId).subscribe({
          next: (cuenta) => {
            // ✅ Ya usamos las propiedades correctas según el nuevo modelo
            const actuales = (this.data.tipo === 'preferencias' ? cuenta.preferencias : cuenta.impedimentos) || [];

            console.log('actuales:', actuales);

            // ✅ Tomamos los ids reales de los productos anidados y filtramos los que existan
            const ids = actuales
              .map((p: any) => p.producto?.id)
              .filter((id: string | undefined): id is string => !!id);

            this.seleccionados.setValue(ids);
          }
        });
      }
    });
  }

  guardar(): void {
    const nuevos = this.seleccionados.value;

    this.cuentaService.getCuenta(this.data.cuentaId).subscribe({
      next: (cuenta) => {
        const actuales = (this.data.tipo === 'preferencias' ? cuenta.preferencias : cuenta.impedimentos) || [];
        const actualesIds = actuales
          .map((p: any) => p.producto?.id)
          .filter((id: string | undefined): id is string => !!id);

        const aAgregar = nuevos.filter(id => !actualesIds.includes(id));
        const aEliminar = actualesIds.filter(id => !nuevos.includes(id));

        // ✅ Agregamos nuevos
        aAgregar.forEach(id => {
          if (this.data.tipo === 'preferencias') {
            this.cuentaService.agregarPreferencia(this.data.cuentaId, id).subscribe();
          } else {
            this.cuentaService.agregarImpedimento(this.data.cuentaId, id).subscribe();
          }
        });

        // ✅ Eliminamos los deseleccionados
        aEliminar.forEach(id => {
          if (this.data.tipo === 'preferencias') {
            this.cuentaService.eliminarPreferencia(this.data.cuentaId, id).subscribe();
          } else {
            this.cuentaService.eliminarImpedimento(this.data.cuentaId, id).subscribe();
          }
        });

        this.dialogRef.close(true); // cerramos e indicamos que hubo cambios
      }
    });
  }

  cancelar(): void {
    this.dialogRef.close(false); // cerramos sin cambios
  }
}
