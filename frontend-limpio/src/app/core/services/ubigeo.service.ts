import { Injectable } from '@angular/core';

// Definimos el tipo para los datos anidados
type UbigeoData = {
  [departamento: string]: {
    [provincia: string]: string[]; // Cada provincia tiene una lista de distritos
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
