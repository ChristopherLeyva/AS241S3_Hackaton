import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

type UbigeoData = {
  [departamento: string]: {
    [provincia: string]: string[];
  };
};

@Injectable({
  providedIn: 'root',
})
export class UbigeoService {
  private data: UbigeoData = {
    Lima: {
      Lima: ['San Juan de Lurigancho', 'Comas', 'Miraflores'],
      Huaral: ['Huaral', 'Chancay'],
    },
    Arequipa: {
      Arequipa: ['Cercado', 'Yanahuara'],
    },
    Cusco: {
      Cusco: ['Wanchaq', 'San Sebastián'],
    },
    Tacna: {
      Tacna: ['Tacna'],
    },
  };

  getDepartamentos(): Observable<string[]> {
    return of(Object.keys(this.data));
  }

  getProvincias(departamento: string): Observable<string[]> {
    return of(this.data[departamento] ? Object.keys(this.data[departamento]) : []);
  }

  getDistritos(departamento: string, provincia: string): Observable<string[]> {
    return of(this.data[departamento]?.[provincia] || []);
  }
}
