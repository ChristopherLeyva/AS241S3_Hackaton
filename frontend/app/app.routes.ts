
import { Routes } from '@angular/router';
import { ClienteListComponent } from './feature/customer/cliente-list/cliente-list.component';
import { ClienteFormComponent } from './feature/customer/cliente-form/cliente-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'clientes/list', pathMatch: 'full' },
  { path: 'clientes/list', component: ClienteListComponent },
  { path: 'clientes/new', component: ClienteFormComponent },
  { path: 'clientes/edit/:id', component: ClienteFormComponent }, 
  { path: '**', redirectTo: 'clientes/list' }
];