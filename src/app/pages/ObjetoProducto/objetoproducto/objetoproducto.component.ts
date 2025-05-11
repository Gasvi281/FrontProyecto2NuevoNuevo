import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { Producto } from 'src/app/models/producto.model';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { RouterModule } from '@angular/router';

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
}
