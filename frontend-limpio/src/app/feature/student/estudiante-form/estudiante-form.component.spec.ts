import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { EstudianteFormComponent } from './estudiante-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('EstudianteFormComponent', () => {
  let component: EstudianteFormComponent;
  let fixture: ComponentFixture<EstudianteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstudianteFormComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EstudianteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
