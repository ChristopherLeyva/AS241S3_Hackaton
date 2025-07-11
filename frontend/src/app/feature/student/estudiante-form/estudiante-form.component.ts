import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EstudianteService } from '../../services/estudiante.service';
import { UbigeoService } from '../../services/ubigeo.service';
import { Estudiante } from '../../models/estudiante.model';

@Component({
  selector: 'app-estudiante-form',
  templateUrl: './estudiante-form.component.html',
  styleUrls: ['./estudiante-form.component.scss']
})
export class EstudianteFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  estudianteId!: number;

  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: string[] = [];

  constructor(
    private fb: FormBuilder,
    private estudianteService: EstudianteService,
    private ubigeoService: UbigeoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.departamentos = this.ubigeoService.getDepartamentos();

    this.form = this.fb.group({
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      fechaNacimiento: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      programa: ['', [Validators.required]],
      anioIngreso: [new Date().getFullYear(), [Validators.required, Validators.min(2000)]],
      departamento: ['', Validators.required],
      provincia: ['', Validators.required],
      distrito: ['', Validators.required],
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.estudianteId = +id;
      this.estudianteService.buscar(this.estudianteId).subscribe(est => {
        this.form.patchValue({
          ...est,
          departamento: est.ubicacion.departamento,
          provincia: est.ubicacion.provincia,
          distrito: est.ubicacion.distrito,
        });
        this.onDepartamentoChange(est.ubicacion.departamento);
        this.onProvinciaChange(est.ubicacion.departamento, est.ubicacion.provincia);
      });
    }
  }

  onDepartamentoChange(depa: string = this.form.value.departamento) {
    this.provincias = this.ubigeoService.getProvincias(depa);
    this.form.patchValue({ provincia: '', distrito: '' });
    this.distritos = [];
  }

  onProvinciaChange(depa: string = this.form.value.departamento, prov: string = this.form.value.provincia) {
    this.distritos = this.ubigeoService.getDistritos(depa, prov);
    this.form.patchValue({ distrito: '' });
  }

  guardar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: Estudiante = {
      ...this.form.value,
      ubicacion: {
        departamento: this.form.value.departamento,
        provincia: this.form.value.provincia,
        distrito: this.form.value.distrito,
      },
    };

    if (this.isEditMode) {
      data.id = this.estudianteId;
      this.estudianteService.actualizar(data).subscribe(() => this.router.navigate(['/estudiantes']));
    } else {
      this.estudianteService.registrar(data).subscribe(() => this.router.navigate(['/estudiantes']));
    }
  }
}
