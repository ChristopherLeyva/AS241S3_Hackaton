import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Cliente } from '../../../core/interfaces/cliente';
import { ClienteService } from '../../../core/services/cliente.service';

@Component({
  selector: 'app-cliente-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
})
export class ClienteFormComponent implements OnInit, OnChanges {
  @Input() clienteDataFromParent: Cliente | null = null;
  @Input() isModalMode: boolean = false;
  @Output() formSubmitted = new EventEmitter<boolean>();
  @Output() formCancelled = new EventEmitter<void>();

  clienteForm!: FormGroup;
  isEditMode: boolean = false;
  clienteId: number | null = null;
  mensajeFeedback: string = '';
  mensajeTipo: 'success' | 'error' | 'info' | '' = '';

  componentMode: 'route' | 'modal' = 'route';

  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.clienteForm = this.fb.group({
      id: [null],
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+$/)]],
      documentType: ['', Validators.required],
      documentNumber: ['', Validators.required],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern('^9[0-9]{8}$')],
      ],
      email: ['', [Validators.required, Validators.email]],
      registrationDate: [null],
      estado: ['A'],
    });

    this.clienteForm.get('documentType')?.valueChanges.subscribe(value => {
      this.updateDocumentNumberValidators(value);
      this.clienteForm.get('documentNumber')?.setValue('');
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['isModalMode'] &&
      changes['isModalMode'].currentValue === true
    ) {
      this.componentMode = 'modal';
    }

    if (
      changes['clienteDataFromParent'] &&
      changes['clienteDataFromParent'].currentValue !== undefined &&
      this.componentMode === 'modal'
    ) {
      if (this.clienteDataFromParent) {
        if (this.clienteDataFromParent.id) {
          this.isEditMode = true;
          this.clienteId = this.clienteDataFromParent.id;
        } else {
          this.isEditMode = false;
          this.clienteId = null;
        }
        this.clienteForm.patchValue(this.clienteDataFromParent);
        if (this.clienteDataFromParent.documentType) {
          this.updateDocumentNumberValidators(this.clienteDataFromParent.documentType);
        }
      }
    }
  }

  ngOnInit(): void {
    if (!this.isModalMode) {
      this.componentMode = 'route';
      this.route.paramMap.subscribe((params) => {
        const idParam = params.get('id');
        if (idParam) {
          this.clienteId = +idParam;
          this.isEditMode = true;
          this.loadCliente(this.clienteId);
        } else {
          this.isEditMode = false;
          this.clienteId = null;
        }
      });
    }
  }

  loadCliente(id: number): void {
    this.clienteService.getClienteById(id).subscribe({
      next: (cliente: Cliente) => {
        this.clienteForm.patchValue(cliente);
        if (cliente.documentType) {
          this.updateDocumentNumberValidators(cliente.documentType);
        }
        this.clearFeedback();
      },
      error: (error) => {
        console.error('Error al cargar cliente para edición:', error);
        this.showFeedback('Error al cargar cliente para edición.', 'error');
        if (this.componentMode === 'route') {
          this.router.navigate(['/clientes']);
        }
      },
    });
  }

  updateDocumentNumberValidators(documentType: string): void {
    const documentNumberControl = this.clienteForm.get('documentNumber');
    if (documentNumberControl) {
      documentNumberControl.clearValidators();

      const validators = [Validators.required];

      if (documentType === 'DNI') {
        validators.push(Validators.pattern('^[0-9]{8}$'));
      } else if (documentType === 'CNE') {
        validators.push(Validators.pattern('^[0-9A-Za-z]{20}$'));
      }

      documentNumberControl.setValidators(validators);
      documentNumberControl.updateValueAndValidity();
    }
  }

  onDocumentNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;
    const documentType = this.clienteForm.get('documentType')?.value;

    if (documentType === 'DNI') {
      value = value.replace(/[^0-9]/g, ''); 
      if (value.length > 8) {
        value = value.substring(0, 8); 
      }
    } else if (documentType === 'CNE') {
      value = value.replace(/[^0-9A-Za-z]/g, ''); 
      if (value.length > 20) {
        value = value.substring(0, 20); 
      }
    }
    this.clienteForm.get('documentNumber')?.setValue(value, { emitEvent: false }); 
  }

  onPhoneNumberInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value;

    value = value.replace(/[^0-9]/g, '');
    if (value.length > 9) {
      value = value.substring(0, 9); 
    }
  
    if (value.length > 0 && value[0] !== '9') {
      value = '9' + value.substring(1);
    }
    this.clienteForm.get('phoneNumber')?.setValue(value, { emitEvent: false }); 
  }


  onSubmit(): void {
    if (this.clienteForm.valid) {
      const cliente: Cliente = this.clienteForm.value;

      if (typeof cliente.id === 'string' && cliente.id) {
          cliente.id = parseInt(cliente.id, 10);
      }

      if (this.isEditMode) {
        this.clienteService.updateCliente(cliente).subscribe({
          next: () => {
            this.showFeedback('Cliente actualizado con éxito!', 'success');
            if (this.componentMode === 'modal') {
              this.formSubmitted.emit(true);
            } else {
              this.router.navigate(['/clientes']);
            }
          },
          error: (error) => {
            console.error('Error al actualizar cliente:', error);
            this.showFeedback('Error al actualizar cliente.', 'error');
          },
        });
      } else {
        cliente.registrationDate = new Date().toISOString();

        this.clienteService.saveCliente(cliente).subscribe({
          next: () => {
            this.showFeedback('Cliente guardado con éxito!', 'success');
            if (this.componentMode === 'modal') {
              this.formSubmitted.emit(true);
            } else {
              this.router.navigate(['/clientes']);
            }
          },
          error: (error) => {
            console.error('Error al guardar cliente:', error);
            this.showFeedback('Error al guardar cliente.', 'error');
          },
        });
      }
    } else {
      this.showFeedback('Formulario inválido. Revise los campos.', 'error');
      this.clienteForm.markAllAsTouched();
    }
  }

  cancel(): void {
    if (this.componentMode === 'route') {
      this.router.navigate(['/clientes']);
    } else {
      this.formCancelled.emit();
    }
  }

  showFeedback(message: string, type: 'success' | 'error' | 'info'): void {
    this.mensajeFeedback = message;
    this.mensajeTipo = type;
    setTimeout(() => {
      this.clearFeedback();
    }, 4000);
  }

  clearFeedback(): void {
    this.mensajeFeedback = '';
    this.mensajeTipo = '';
  }
}