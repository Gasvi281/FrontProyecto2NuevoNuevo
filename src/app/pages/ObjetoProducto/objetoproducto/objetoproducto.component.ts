import { CommonModule } from '@angular/common';
import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { RouterModule } from '@angular/router';
import { ListaCompraService } from 'src/app/services/listaCompra/listaCompra.service';

@Component({
  selector: 'app-objetoproducto',
  imports: [MaterialModule, ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './objetoproducto.component.html',
  styleUrl: './objetoproducto.component.scss'
})
export class ObjetoproductoComponent {
  form!: FormGroup;
  editMode: boolean | false;
  objetoproductoId: string;

  constructor(
    private productoService: ProductoService,
    private listaCompraService: ListaCompraService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ){}

  initForm():void{
    this.form = this.fb.group({
      nombreProducto:['', Validators.required],
      categoria: ['', Validators.required],
      estado: ['Activo']
    })
  }

  ngOnInit(){
    this.initForm();

    this.route.paramMap.subscribe(params=>{
      const id = params.get('id');
      if(id){
        this.objetoproductoId = id;
        this.editMode = true;
        this.getProductoById(id);
      }
    })
  }

  getProductoById(id: string){
    this.productoService.getProductoById(id).subscribe({
      next:(producto:Producto)=>{
        this.form.patchValue({
          nombreProducto: producto.nombreProducto,
          categoria: producto.categoria,
          estado: producto.estado
        })
      }, error:()=>{
        console.log("Error al encontrar producto");
      }
    })
  }

  agregarProductoALaLista(){
    const cuentaId = localStorage.getItem('id');
    if (!cuentaId || !this.objetoproductoId) return;

    this.listaCompraService.agregarProducto(cuentaId, this.objetoproductoId, 1).subscribe({
      next: (res) => {
        console.log('Producto agregado exitosamente', res);
      },
      error: (err) => {
        console.error('Error al agregar producto', err);
      }
    });
  }
}
