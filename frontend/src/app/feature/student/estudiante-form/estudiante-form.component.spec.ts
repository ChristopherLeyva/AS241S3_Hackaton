import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EstudianteFormComponent } from './estudiante-form.component';
import { EstudianteService } from '../services/estudiante.service';
import { UbigeoService } from '../services/ubigeo.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('EstudianteFormComponent', () => {
  let component: EstudianteFormComponent;
  let fixture: ComponentFixture<EstudianteFormComponent>;
  let estudianteService: jasmine.SpyObj<EstudianteService>;
  let ubigeoService: jasmine.SpyObj<UbigeoService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const estudianteServiceSpy = jasmine.createSpyObj('EstudianteService', ['create', 'update', 'getById']);
    const ubigeoServiceSpy = jasmine.createSpyObj('UbigeoService', ['getDepartamentos', 'getProvincias', 'getDistritos']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [EstudianteFormComponent],
      providers: [
        { provide: EstudianteService, useValue: estudianteServiceSpy },
        { provide: UbigeoService, useValue: ubigeoServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EstudianteFormComponent);
    component = fixture.componentInstance;
    estudianteService = TestBed.inject(EstudianteService) as jasmine.SpyObj<EstudianteService>;
    ubigeoService = TestBed.inject(UbigeoService) as jasmine.SpyObj<UbigeoService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load departamentos on init', () => {
    const departamentosMock = ['Lima', 'Arequipa'];
    ubigeoService.getDepartamentos.and.returnValue(of(departamentosMock));
    component.ngOnInit();
    expect(component.departamentos).toEqual(departamentosMock);
  });

  it('should navigate to list on save', () => {
    component.form.setValue({
      nombres: 'Juan',
      apellidos: 'Pérez',
      dni: '12345678',
      fechaNacimiento: '2000-01-01',
      email: 'juan@example.com',
      celular: '987654321',
      programa: 'Computación',
      anioIngreso: 2021,
      departamento: 'Lima',
      provincia: 'Lima',
      distrito: 'San Isidro',
    });
    estudianteService.create.and.returnValue(of({}));
    component.guardar();
    expect(router.navigate).toHaveBeenCalledWith(['/estudiantes/list']);
  });
});
