import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Empleado } from '../../models/empleado';
import { EmpleadoService } from '../../services/empleado';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './empleado.html',
  styleUrls: ['./empleado.css'],
})
export class EmpleadoComponent implements OnInit {
  empleados: Empleado[] = [];

  textoBusqueda: string = '';
  mensaje: string = '';

  empleado: Empleado = {
    nombre: '',
    apellido: '',
    dni: '',
    genero: '',
    estadoCivil: '',
  };

  constructor(private empleadoService: EmpleadoService) {}

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.empleadoService.listar().subscribe((data: Empleado[]) => {
      this.empleados = data;

      console.log(data);
    });
  }

  guardar(): void {
    if (!this.validarFormulario()) {
      return;
    }
    if (this.empleado.id) {
      this.empleadoService.actualizar(this.empleado.id, this.empleado).subscribe(() => {
        this.listar();
        this.limpiarFormulario();
      });
    } else {
      this.empleadoService.guardar(this.empleado).subscribe(() => {
        this.listar();
        this.limpiarFormulario();
      });
    }
  }

  editar(emp: Empleado): void {
    this.empleado = { ...emp };
  }

  eliminar(id?: number): void {
    if (!id) return;

    const confirmar = confirm('¿Está seguro de eliminar este empleado?');

    if (!confirmar) return;

    this.empleadoService.eliminar(id).subscribe(() => {
      this.listar();
    });
  }

  buscar(): void {
    if (this.textoBusqueda.trim() === '') {
      this.listar();
      return;
    }

    this.empleadoService.buscar(this.textoBusqueda).subscribe((data: Empleado[]) => {
      this.empleados = data;
    });
  }

  limpiarFormulario(): void {
    this.empleado = {
      nombre: '',
      apellido: '',
      dni: '',
      genero: '',
      estadoCivil: '',
    };
  }
  validarFormulario(): boolean {

    if (
      this.empleado.nombre.trim() === '' ||
      this.empleado.apellido.trim() === '' ||
      this.empleado.dni.trim() === '' ||
      this.empleado.genero.trim() === '' ||
      this.empleado.estadoCivil.trim() === ''
    ) {

      this.mensaje = 'Todos los campos son obligatorios';
      return false;

    }

    if (this.empleado.dni.length !== 8) {

      this.mensaje = 'El DNI debe tener 8 dígitos';
      return false;

    }

    return true;

  }
}
