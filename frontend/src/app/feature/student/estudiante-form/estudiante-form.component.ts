import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EstudianteService } from '../services/estudiante.service';
import { UbigeoService } from '../services/ubigeo.service';
import { Estudiante } from '../interfaces/estudiante';

@Component({
  selector: 'app-estudiante-form',
  templateUrl: './estudiante-form.component.html',
  styleUrls: ['./estudiante-form.component.scss'],
})
export class EstudianteFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false; // Cambiar a true si se está editando
  estudianteId: number | null = null; // ID del estudiante a editar
  departamentos: string[] = []; // Lista de departamentos
  provincias: string[] = []; // Lista de provincias
  distritos: string[] = []; // Lista de distritos

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private estudianteService: EstudianteService,
    private ubigeoService: UbigeoService
  ) {
    this.form = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      dni: ['', [Validators.required, Validators.maxLength(8)]],
      fechaNacimiento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.maxLength(9)]],
      programa: ['', Validators.required],
      anioIngreso: ['', [Validators.required, Validators.min(2000)]],
      departamento: ['', Validators.required],
      provincia: ['', Validators.required],
      distrito: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUbigeoData();
    if (this.isEditMode) {
      this.loadEstudianteData();
    }
  }

  loadUbigeoData() {
    // Cargar departamentos, provincias y distritos desde el servicio
    this.ubigeoService.getDepartamentos().subscribe(departamentos => {
      this.departamentos = departamentos;
    });
  }

  onDepartamentoChange() {
    const departamento = this.form.get('departamento')?.value;
    this.ubigeoService.getProvincias(departamento).subscribe(provincias => {
      this.provincias = provincias;
      this.distritos = []; // Limpiar distritos al cambiar de departamento
      this.form.get('provincia')?.setValue(''); // Reiniciar provincia
      this.form.get('distrito')?.setValue(''); // Reiniciar distrito
    });
  }

  onProvinciaChange() {
    const departamento = this.form.get('departamento')?.value;
    const provincia = this.form.get('provincia')?.value;
    this.ubigeoService.getDistritos(departamento, provincia).subscribe(distritos => {
      this.distritos = distritos;
    });
  }

  loadEstudianteData() {
    // Cargar datos del estudiante a editar
    this.estudianteService.getById(this.estudianteId!).subscribe(estudiante => {
      this.form.patchValue(estudiante);
    });
  }

  guardar() {
    if (this.form.invalid) {
      return;
    }

    const estudianteData: Estudiante = this.form.value;

    const request$ = this.isEditMode
      ? this.estudianteService.update(this.estudianteId!, estudianteData)
      : this.estudianteService.create(estudianteData);

    request$.subscribe(() => {
      this.router.navigate(['/estudiantes/list']);
    });
  }
}
