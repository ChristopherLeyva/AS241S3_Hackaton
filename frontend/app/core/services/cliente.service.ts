import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../interfaces/cliente';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = `${environment.apiUrl}/api/cliente`;

  constructor(private http: HttpClient) { }

  getAllClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  saveCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/save`, cliente);
  }

  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.apiUrl}/update`, cliente);
  }

  deleteClienteLogico(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete-logico/${id}`, { responseType: 'text' as 'json' }); // responseType: 'text' para recibir String
  }

  deleteClienteFisico(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete-fisico/${id}`, { responseType: 'text' as 'json' }); // responseType: 'text' para recibir String
  }

  restoreCliente(id: number): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/restore/${id}`, {}, { responseType: 'text' as 'json' }); // responseType: 'text' para recibir String
  }

  getClientesByEstado(estado: string): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiUrl}/estado/${estado}`);
  }
}