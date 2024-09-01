import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ProdutosService } from '../../../Services/Produto/produtos.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

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
    MessageModule
  ],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.scss',
})
export class ProdutoFormComponent implements OnInit {
  @Input() produto: Produto = {} as Produto;
  @Output() save = new EventEmitter<Produto>();
  @Output() cancel = new EventEmitter<void>();

  // TODO: Implementar a lógica de categorias
  categorias: { name: string; code: string }[] = [
    { name: 'Categoria 1', code: 'cat1' },
    { name: 'Categoria 2', code: 'cat2' },
    { name: 'Categoria 3', code: 'cat3' },
  ];
  unidadeMedida: { name: string; code: string }[] = [
    { name: 'Unidade', code: 'un' },
    { name: 'Quilograma', code: 'kg' },
    { name: 'Litro', code: 'l' },
    { name: 'Grama', code: 'g' },
    { name: 'Mililitro', code: 'ml'},
  ];

  produtoForm!: FormGroup;

  constructor(private fb: FormBuilder, 
    private produtoService : ProdutosService,
    private messageService: MessageService,
    private router: Router) {}

  ngOnInit(): void {
    this.produtoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      marca: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      descricao: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      validade: ['', [Validators.required, this.validadeValidator]],
      peso: [0, [Validators.required, Validators.min(0.1), Validators.max(1000)]],
      preco: [
        null, 
        [
          Validators.required, 
          Validators.pattern(/^\d+(\.\d{1,2})?$/) // Permite números decimais com até duas casas
        ]
      ],
      unidadeMedida: ['', Validators.required],
      ingredientes: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      paisOrigem: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      categoria: ['', Validators.required]
    });

    if (this.produto) {
      this.produtoForm.patchValue(this.produto);
    }
  }

  // TODO: Implementar a lógica de edição
   ngOnChanges(changes: SimpleChanges): void {
     if (changes['produto'] && changes['produto'].currentValue) {
       this.produtoForm.patchValue(changes['produto'].currentValue);
    }
   }

  onSave(): void {

    const novoProduto: Produto = {
      nome: this.produtoForm.get('nome')?.value,
      preco: this.produtoForm.get('preco')?.value,
      peso: this.produtoForm.get('peso')?.value,
      unidadeMedida: this.produtoForm.get('unidadeMedida')?.value.name,
      ingredientes: this.produtoForm.get('ingredientes')?.value,
      marca: this.produtoForm.get('marca')?.value,
      descricao: this.produtoForm.get('descricao')?.value,
      paisOrigem: this.produtoForm.get('paisOrigem')?.value,
      validade: this.produtoForm.get('validade')?.value.toISOString(),
      categoria: this.produtoForm.get('categoria')?.value.code,
    }

    console.log(novoProduto);

    if(this.produtoForm.valid) {
      this.produtoService.postProduct(novoProduto).subscribe((response: any) => { 
        if (response && response.produtoId) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: `Produto "${response.nome}" cadastrado com sucesso!`
          });

          this.save.emit();
    
          this.onCancel();
    
          setTimeout(() => {
            this.router.navigate(['produtos']);
          }, 2000);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Ocorreu um erro ao cadastrar o produto. Tente novamente.'
          });
        }
      }, (error) => {
        console.error('Erro ao cadastrar produto:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Ocorreu um erro ao cadastrar o produto. Verifique sua conexão e tente novamente.'
        });
      });
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
