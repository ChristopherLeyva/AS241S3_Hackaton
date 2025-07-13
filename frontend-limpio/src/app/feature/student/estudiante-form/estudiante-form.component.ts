import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EstudianteService } from '@core/services/estudiante.service';
import { UbigeoService } from '@core/services/ubigeo.service';
import { Estudiante } from '@core/interfaces/estudiante';

@Component({
  selector: 'app-estudiante-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './estudiante-form.component.html',
  styleUrls: ['./estudiante-form.component.scss']
})
export class EstudianteFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  estudianteId: number | null = null;
  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: string[] = [];

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
    this.ubigeoService.getDepartamentos().subscribe((departamentos: string[]) => {
      this.departamentos = departamentos;
    });
  }

  onDepartamentoChange() {
    const departamento = this.form.get('departamento')?.value;
    this.ubigeoService.getProvincias(departamento).subscribe((provincias: string[]) => {
      this.provincias = provincias;
      this.distritos = [];
      this.form.get('provincia')?.setValue('');
      this.form.get('distrito')?.setValue('');
    });
  }

  onProvinciaChange() {
    const departamento = this.form.get('departamento')?.value;
    const provincia = this.form.get('provincia')?.value;
    this.ubigeoService.getDistritos(departamento, provincia).subscribe((distritos: string[]) => {
      this.distritos = distritos;
    });
  }

  loadEstudianteData() {
    this.estudianteService.getById(this.estudianteId!).subscribe((estudiante) => {
      const { ubicacion, ...rest } = estudiante;
      this.form.patchValue({
        ...rest,
        departamento: ubicacion.departamento,
        provincia: ubicacion.provincia,
        distrito: ubicacion.distrito
      });

      this.ubigeoService.getProvincias(ubicacion.departamento).subscribe((provincias: string[]) => {
        this.provincias = provincias;
        this.ubigeoService.getDistritos(ubicacion.departamento, ubicacion.provincia).subscribe((distritos: string[]) => {
          this.distritos = distritos;
        });
      });
    });
  }

  guardar() {
    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value;

    const estudianteData: Estudiante = {
      ...formValue,
      ubicacion: {
        departamento: formValue.departamento,
        provincia: formValue.provincia,
        distrito: formValue.distrito
      }
    };

    delete (estudianteData as any).departamento;
    delete (estudianteData as any).provincia;
    delete (estudianteData as any).distrito;

    const request$ = this.isEditMode
      ? this.estudianteService.update(this.estudianteId!, estudianteData)
      : this.estudianteService.create(estudianteData);

    request$.subscribe(() => {
      this.router.navigate(['/estudiantes/list']);
    });
  }
}
