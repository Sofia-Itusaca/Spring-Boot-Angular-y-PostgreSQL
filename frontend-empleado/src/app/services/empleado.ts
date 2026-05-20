import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root',
})
export class EmpleadoService {
  private url = 'http://161.97.86.138:8082/api/empleados';

  constructor(private http: HttpClient) {}

  listar(): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(this.url);
  }

  guardar(empleado: Empleado): Observable<Empleado> {
    return this.http.post<Empleado>(this.url, empleado);
  }

  actualizar(id: number, empleado: Empleado): Observable<Empleado> {
    return this.http.put<Empleado>(`${this.url}/${id}`, empleado);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  buscar(texto: string): Observable<Empleado[]> {
    return this.http.get<Empleado[]>(`${this.url}/buscar/${texto}`);
  }
}
