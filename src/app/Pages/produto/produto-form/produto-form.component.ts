import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { ProdutosService } from '../../../Services/Produto/produtos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from '../../../Models/product.model';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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

  categorias: { name: string; code: string }[] = [
    { name: 'Categoria 1', code: 'cat1' },
    { name: 'Categoria 2', code: 'cat2' },
    { name: 'Categoria 3', code: 'cat3' },
  ];

  produtoForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.produtoForm = this.fb.group({
      nome: ['', Validators.required],
      marca: [''],
      descricao: [''],
      validade: [''],
      peso: [0],
      unidadeDeMedida: [''],
      ingredientes: [''],
      paisOrigem: [''],
      categoria: ['']
    });

    // Inicializar o formulário com os dados do produto, se disponíveis
    if (this.product) {
      this.produtoForm.patchValue(this.product);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && changes['product'].currentValue) {
      this.produtoForm.patchValue(changes['product'].currentValue);
    }
  }

  onSave(): void {
    if (this.produtoForm.valid) {
      this.save.emit(this.produtoForm.value);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
