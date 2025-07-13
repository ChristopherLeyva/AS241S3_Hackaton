import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UbigeoService } from '@core/services/ubigeo.service';
import { firstValueFrom } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-estudiante-form',
  templateUrl: './estudiante-form.component.html',
  styleUrls: ['./estudiante-form.component.scss'],

  imports: [CommonModule, ReactiveFormsModule]
})
export class EstudianteFormComponent implements OnInit {
  fb = inject(FormBuilder);
  ubigeoService = inject(UbigeoService);

  estudianteForm!: FormGroup;
  currentYear: number = new Date().getFullYear();
  isEditMode = false;

  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: string[] = [];

  async ngOnInit() {
    this.estudianteForm = this.fb.group({
      dni: ['', [
        Validators.required,
        Validators.pattern(/^\d{8}$/)
      ]],
      nombres: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/)
      ]],
      apellidos: ['', [
        Validators.required,
        Validators.pattern(/^[A-Za-zÁÉÍÓÚÑáéíóúñ\s]+$/)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
      ]],
      celular: ['', [
        Validators.required,
        Validators.pattern(/^9\d{8}$/)
      ]],
      programa: ['', Validators.required],
      anioIngreso: ['', [
        Validators.required,
        Validators.min(2000),
        Validators.max(this.currentYear)
      ]],
      departamento: ['', Validators.required],
      provincia: ['', Validators.required],
      distrito: ['', Validators.required],
    });

    this.departamentos = await firstValueFrom(this.ubigeoService.getDepartamentos());
  }

  async onDepartamentoChange(event: Event) {
    const dept = (event.target as HTMLSelectElement).value;
    this.provincias = await firstValueFrom(this.ubigeoService.getProvincias(dept));
    this.distritos = [];
    this.estudianteForm.get('provincia')?.reset();
    this.estudianteForm.get('distrito')?.reset();
  }

  async onProvinciaChange(event: Event) {
    const prov = (event.target as HTMLSelectElement).value;
    const dept = this.estudianteForm.get('departamento')?.value;
    this.distritos = await firstValueFrom(this.ubigeoService.getDistritos(dept, prov));
    this.estudianteForm.get('distrito')?.reset();
  }

  onSubmit(): void {
    if (this.estudianteForm.invalid) {
      this.estudianteForm.markAllAsTouched();
      return;
    }

    const estudiante = this.estudianteForm.value;
    console.log('Estudiante registrado:', estudiante);
  }

  f(campo: string) {
    return this.estudianteForm.get(campo)!;
  }
}
