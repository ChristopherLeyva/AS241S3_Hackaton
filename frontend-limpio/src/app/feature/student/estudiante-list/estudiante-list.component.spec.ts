import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudianteListComponent } from './estudiante-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';

describe('EstudianteListComponent', () => {
  let component: EstudianteListComponent;
  let fixture: ComponentFixture<EstudianteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstudianteListComponent],
      imports: [HttpClientTestingModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(EstudianteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
