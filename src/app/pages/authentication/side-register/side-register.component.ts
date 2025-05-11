import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { Cuenta } from 'src/app/models/cuenta.model';
import { CuentaService } from 'src/app/services/cuenta/cuenta.service';
@Component({
  selector: 'app-side-register',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService, private router: Router, private cuentaService: CuentaService) {}

  form = new FormGroup({
    name: new FormControl('',[Validators.required]),
    uname: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  addCuenta() {

    const cuenta: Cuenta = {
      nombreUsuario: this.form.value.uname!,
      email: this.form.value.email!,
      nombre: this.form.value.name!,
      password: this.form.value.password!,
      ProductosP: [],
      ProductosI: [],
    }

    this.cuentaService.addCuenta(cuenta).subscribe({
      next:(res)=>{
        alert("Usuario registrado correctamente");
        this.router.navigate(['/authentication/login']);
      },
      error:(err)=>{
        console.log(err);
        alert("Error al registrar el usuario")
      }
    })
  }
}
