import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';       
import { FormsModule } from '@angular/forms';         
import { RouterModule } from '@angular/router';      

import { EstudianteService } from '@core/services/estudiante.service';
import { UbigeoService } from '@core/services/ubigeo.service';
import { Estudiante } from '@core/interfaces/estudiante';

@Component({
  standalone: true,                                   
  selector: 'app-estudiante-list',
  templateUrl: './estudiante-list.component.html',
  styleUrls: ['./estudiante-list.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ]
})
export class EstudianteListComponent implements OnInit {
  estudiantes: Estudiante[] = [];
  estudiantesFiltrados: Estudiante[] = [];

  filtroNombre = '';
  filtroPrograma = '';
  filtroDepartamento = '';
  filtroProvincia = '';
  filtroDistrito = '';

  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: string[] = [];

  constructor(
    private estudianteService: EstudianteService,
    private ubigeoService: UbigeoService
  ) {}

  ngOnInit(): void {
    this.ubigeoService.getDepartamentos().subscribe((data: string[]) => {
      this.departamentos = data;
    });
    this.listar();
  }

  listar(): void {
    this.estudianteService.getAll().subscribe((data: Estudiante[]) => {
      this.estudiantes = data.filter(e => e.estado === 'A');
      this.ordenar();
      this.filtrar();
    });
  }

  ordenar() {
    this.estudiantes.sort((a, b) => a.apellidos.localeCompare(b.apellidos));
  }

  onDepartamentoChange() {
    this.ubigeoService.getProvincias(this.filtroDepartamento).subscribe((data: string[]) => {
      this.provincias = data;
      this.filtroProvincia = '';
      this.filtroDistrito = '';
      this.distritos = [];
      this.filtrar();
    });
  }

  onProvinciaChange() {
    this.ubigeoService.getDistritos(this.filtroDepartamento, this.filtroProvincia).subscribe((data: string[]) => {
      this.distritos = data;
      this.filtroDistrito = '';
      this.filtrar();
    });
  }

  filtrar() {
    this.estudiantesFiltrados = this.estudiantes.filter(e =>
      (!this.filtroNombre || e.nombres.toLowerCase().includes(this.filtroNombre.toLowerCase())) &&
      (!this.filtroPrograma || e.programa.toLowerCase().includes(this.filtroPrograma.toLowerCase())) &&
      (!this.filtroDepartamento || e.ubicacion.departamento === this.filtroDepartamento) &&
      (!this.filtroProvincia || e.ubicacion.provincia === this.filtroProvincia) &&
      (!this.filtroDistrito || e.ubicacion.distrito === this.filtroDistrito)
    );
  }

  eliminar(id: number) {
    if (confirm('¿Eliminar estudiante?')) {
      this.estudianteService.delete(id).subscribe(() => this.listar());
    }
  }

  restaurar(id: number) {
    if (confirm('¿Restaurar estudiante?')) {
      this.estudianteService.restore(id).subscribe(() => this.listar());
    }
  }

  descargarPDF() {
    this.estudianteService.downloadPDF().subscribe((blob: Blob | MediaSource) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'reporte_estudiantes.pdf';
      link.click();
    });
  }
}
