import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UbigeoService {
  private data = {
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

  getDepartamentos(): string[] {
    return Object.keys(this.data);
  }

  getProvincias(departamento: string): string[] {
    return this.data[departamento]
      ? Object.keys(this.data[departamento])
      : [];
  }

  getDistritos(departamento: string, provincia: string): string[] {
    return this.data[departamento]?.[provincia] || [];
  }
}
