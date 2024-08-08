import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Produto } from '../../../Models/product.model';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';
import {AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [
    DialogModule,
    DropdownModule,
    TableModule,
    FormsModule,
    CommonModule,
    ButtonModule,
    PaginatorModule,
    ConfirmDialogModule,
    ToastModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    CheckboxModule,
    DropdownModule,
    InputMaskModule,
    CardModule,
    TooltipModule,
    CalendarModule,
    ReactiveFormsModule,
    InputNumberModule,
  ],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.scss',
})
export class ProdutoFormComponent implements OnInit {
  @Input() product: Produto = {} as Produto;
  @Output() save = new EventEmitter<Produto>();
  @Output() cancel = new EventEmitter<void>();

  // TODO: Implementar a lógica de categorias
  categorias: { name: string; code: string }[] = [
    { name: 'Categoria 1', code: 'cat1' },
    { name: 'Categoria 2', code: 'cat2' },
    { name: 'Categoria 3', code: 'cat3' },
  ];
  unidadesDeMedida: { name: string; code: string }[] = [
    { name: 'Unidade', code: 'un' },
    { name: 'Quilograma', code: 'kg' },
    { name: 'Litro', code: 'l' },
    { name: 'Grama', code: 'g' },
    { name: 'Mililitro', code: 'ml'},
  ];

  produtoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.produtoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      marca: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      descricao: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      validade: ['', [Validators.required, this.validadeValidator]],
      peso: [0, [Validators.required, Validators.min(0.1), Validators.max(1000)]],
      unidadeDeMedida: ['', Validators.required],
      ingredientes: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      paisOrigem: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      categoria: ['', Validators.required]
    });

    if (this.product) {
      this.produtoForm.patchValue(this.product);
    }
  }

  // TODO: Implementar a lógica de edição
  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['product'] && changes['product'].currentValue) {
  //     this.produtoForm.patchValue(changes['product'].currentValue);
  //   }
  // }

  onSave(): void {
    if (this.produtoForm.valid) {
      this.save.emit(this.produtoForm.value);
    }
  }

  onCancel(): void {
    this.produtoForm.reset();
    this.cancel.emit();
  }

  validadeValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const validade = new Date(control.value);
    const today = new Date();
    if (validade < today) {
      return { 'invalidDate': true };
    }
    return null;
  }
}
