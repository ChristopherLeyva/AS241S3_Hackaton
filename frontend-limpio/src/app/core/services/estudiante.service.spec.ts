import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EstudianteService } from './estudiante.service';
import { Estudiante } from '../interfaces/estudiante';

describe('EstudianteService', () => {
  let service: EstudianteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EstudianteService]
    });

    service = TestBed.inject(EstudianteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all active estudiantes', () => {
    const dummyEstudiantes: Estudiante[] = [
      {
        nombres: 'Ana',
        apellidos: 'Lopez',
        dni: '12345678',
        fechaNacimiento: '2000-01-01',
        programa: 'Contabilidad',
        anioIngreso: 2022,
        email: 'ana@example.com',
        celular: '987654321',
        ubicacion: {
          departamento: 'Lima',
          provincia: 'Lima',
          distrito: 'San Borja'
        }
      }
    ];

    service.getAll().subscribe(estudiantes => {
      expect(estudiantes.length).toBe(1);
      expect(estudiantes).toEqual(dummyEstudiantes);
    });

    const req = httpMock.expectOne('http://localhost:8085/api/estudiantes/activos');
    expect(req.request.method).toBe('GET');
    req.flush(dummyEstudiantes);
  });
});
