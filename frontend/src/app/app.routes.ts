import { Routes } from '@angular/router';
import { EstudianteListComponent } from './feature/student/estudiante-list/estudiante-list.component';
import { EstudianteFormComponent } from './feature/student/estudiante-form/estudiante-form.component';

export const routes: Routes = [
  // Redirección por defecto
  { path: '', redirectTo: 'estudiantes/list', pathMatch: 'full' },

  // Listado
  { path: 'estudiantes/list', component: EstudianteListComponent },

  // Formulario para nuevo
  { path: 'estudiantes/new', component: EstudianteFormComponent },

  // Formulario para editar
  { path: 'estudiantes/edit/:id', component: EstudianteFormComponent },

  // Ruta comodín
  { path: '**', redirectTo: 'estudiantes/list' }
];
