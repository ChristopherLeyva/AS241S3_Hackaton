import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Estudiante } from '../interfaces/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {
  private apiUrl = 'http://localhost:8085/api/estudiante';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Estudiante[]> {
    return this.http.get<Estudiante[]>(`${this.apiUrl}/estado/A`);
  }

  getById(id: number): Observable<Estudiante> {
    return this.http.get<Estudiante>(`${this.apiUrl}/${id}`);
  }

  create(estudiante: Estudiante): Observable<Estudiante> {
    return this.http.post<Estudiante>(`${this.apiUrl}/save`, estudiante);
  }

  update(id: number, estudiante: Estudiante): Observable<Estudiante> {
    estudiante.id = id;
    return this.http.put<Estudiante>(`${this.apiUrl}/update`, estudiante);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-logico/${id}`);
  }

  restore(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/restore/${id}`, {});
  }

  downloadPDF(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/pdf`, { responseType: 'blob' });
  }
}
