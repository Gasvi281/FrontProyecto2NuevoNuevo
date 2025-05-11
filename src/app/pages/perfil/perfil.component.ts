import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from 'src/app/material.module';
import { Cuenta } from 'src/app/models/cuenta.model';
import { CuentaService } from 'src/app/services/cuenta/cuenta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'perfil',
  imports: [MaterialModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss'
})
export class PerfilComponent {
  cuenta: Cuenta;

  constructor(private cuentaService: CuentaService, private Router: Router){
    

  }

  ngOnInit(){
    this.getCuenta();
  }

  getCuenta(){
    const id = localStorage.getItem('id') || '';
    this.cuentaService.getCuenta(id).subscribe({
      next:(res)=>{
        this.cuenta = res;
        console.log(id)
        console.log(res)
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}