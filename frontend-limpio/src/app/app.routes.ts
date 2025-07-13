
import { Routes } from '@angular/router';
import { EstudianteListComponent } from './feature/student/estudiante-list/estudiante-list.component';
import { EstudianteFormComponent } from './feature/student/estudiante-form/estudiante-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'estudiantes/list', pathMatch: 'full' },
  { path: 'estudiantes/list', component: EstudianteListComponent },
  { path: 'estudiantes/new', component: EstudianteFormComponent },
  { path: 'estudiantes/edit/:id', component: EstudianteFormComponent },
  { path: '**', redirectTo: 'estudiantes/list' }
];
