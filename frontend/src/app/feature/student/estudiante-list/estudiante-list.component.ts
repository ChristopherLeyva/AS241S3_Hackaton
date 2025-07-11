import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../services/estudiante.service';
import { UbigeoService } from '../../services/ubigeo.service';
import { Estudiante } from '../../models/estudiante.model';

@Component({
  selector: 'app-estudiante-list',
  templateUrl: './estudiante-list.component.html',
  styleUrls: ['./estudiante-list.component.scss']
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
    this.departamentos = this.ubigeoService.getDepartamentos();
    this.listar();
  }

  listar(): void {
    this.estudianteService.listar().subscribe((data) => {
      this.estudiantes = data.filter(e => e.estado === 'A');
      this.ordenar();
      this.filtrar();
    });
  }

  ordenar() {
    this.estudiantes.sort((a, b) => a.apellidos.localeCompare(b.apellidos));
  }

  onDepartamentoChange() {
    this.provincias = this.ubigeoService.getProvincias(this.filtroDepartamento);
    this.filtroProvincia = '';
    this.filtroDistrito = '';
    this.distritos = [];
    this.filtrar();
  }

  onProvinciaChange() {
    this.distritos = this.ubigeoService.getDistritos(this.filtroDepartamento, this.filtroProvincia);
    this.filtroDistrito = '';
    this.filtrar();
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
      this.estudianteService.eliminar(id).subscribe(() => this.listar());
    }
  }

  restaurar(id: number) {
    if (confirm('¿Restaurar estudiante?')) {
      this.estudianteService.restaurar(id).subscribe(() => this.listar());
    }
  }

  descargarPDF() {
    this.estudianteService.descargarPDF();
  }
}
