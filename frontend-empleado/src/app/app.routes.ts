import { Routes } from '@angular/router';
import { EmpleadoComponent } from './components/empleado/empleado';

export const routes: Routes = [
  { path: '', redirectTo: 'empleados', pathMatch: 'full' },
  { path: 'empleados', component: EmpleadoComponent },
];
