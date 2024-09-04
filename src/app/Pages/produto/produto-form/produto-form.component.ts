import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Produto } from '../../../Models/product.model';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
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
import { ChipsModule } from 'primeng/chips';
import { MultiSelectModule } from 'primeng/multiselect';

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
    MessageModule,
    ChipsModule,
    MultiSelectModule,
  ],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.scss',
})
export class ProdutoFormComponent implements OnInit {
  @Input() produto!: Produto;
  @Output() save = new EventEmitter<Produto>();
  @Output() cancel = new EventEmitter<void>();

  categorias = [
    { nome: 'Alimentos e Bebidas' },
    { nome: 'Carnes e Aves' },
    { nome: 'Frutas, Verduras e Legumes' },
    { nome: 'Laticínios e Ovos' },
    { nome: 'Padaria e Confeitaria' },
    { nome: 'Bebidas' },
    { nome: 'Limpeza' },
    { nome: 'Higiene e Beleza' },
    { nome: 'Papelaria' },
    { nome: 'Pet Shop' },
    { nome: 'Congelados' },
    { nome: 'Bebidas Alcoólicas' },
    { nome: 'Massas e Pizzas' },
    { nome: 'Doces e Sobremesas' },
    { nome: 'Cereais e Grãos' },
    { nome: 'Óleos e Temperos' },
    { nome: 'Petiscos e Snacks' },
    { nome: 'Saudáveis e Especiais' },
    { nome: 'Pescados e Frutos do Mar' },
    { nome: 'Mercearia' },
    { nome: 'Utilidades Domésticas' },
    { nome: 'Cuidados com a Casa' },
    { nome: 'Bebê e Infantil' }
  ];
  
  
  unidadeMedida: string[] = [
    'Unidade',
    'Pacote',
    'Caixa',
    'Quilograma',
    'Grama',
    'Miligrama',
    'Litro',
    'Mililitro',
    'Metro',
    'Centímetro',
    'Metro Quadrado',
    'Centímetro Quadrado',
    'Metro Cúbico',
    'Centímetro Cúbico',
    'Dúzia',
    'Par',
    'Rolo',
    'Fardo',
    'Saco',
    'Lata',
    'Vidro',
    'Frasco',
    'Tubo',
    'Pote',
    'Envelope',
    'Galão',
    'Barril',
    'Peça',
    'Cartela',
    'Bloco',
    'Folha',
    'Kit',
    'Torrada',
    'Fatia',
    'Porção',
    'Massa',
    'Filete',
    'Punhado',
    'Lote',
    'Bisnaga',
    'Balde',
    'Garrafa',
    'Ampola',
    'Tábua',
  ];

  produtoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutosService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.produtoForm = this.fb.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      marca: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      descricao: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      validade: ['', [Validators.required, this.validadeValidator]],
      peso: [
        0,
        [Validators.required, Validators.min(0.1), Validators.max(1000)],
      ],
      preco: [
        null,
        [
          Validators.required,
          Validators.pattern(/^\d+(\.\d{1,2})?$/), // Permite números decimais com até duas casas
        ],
      ],
      unidadeMedida: ['', Validators.required],
      ingredientes: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      paisOrigem: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      categorias: [[], Validators.required],
      tags: [[]],
    });

    if (this.produto) {
      this.produtoForm.patchValue(this.produto);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['produto'] && this.produto) {
      this.loadProdutoData(this.produto);
      console.log(this.produto);
    }
  }

  loadProdutoData(produto: any) {

    if (this.produtoForm) {
     
      const nomeCategorias = produto.categorias.map((categoria: any) => ({ nome: categoria.nome }));



      this.produtoForm.patchValue({
        nome: produto.nome,
        marca: produto.marca,
        descricao: produto.descricao,
        validade: produto.validade ? new Date(produto.validade) : null,
        unidadeMedida: produto.unidadeMedida || null, 
        peso: produto.peso,
        preco: produto.preco,
        ingredientes: produto.ingredientes,
        paisOrigem: produto.paisOrigem,
        categorias: nomeCategorias,
        tags: produto.tags,
      });
      
      console.log('Formulário atualizado com o produto:', this.produtoForm.value);
    } else {
      console.error('produtoForm não definido');
    }
  }

  onSave(): void {

    // Construir o objeto novoProduto com as informações do formulário
    const novoProduto: Produto = {
      nome: this.produtoForm.get('nome')?.value,
      preco: this.produtoForm.get('preco')?.value,
      peso: this.produtoForm.get('peso')?.value,
      unidadeMedida: this.produtoForm.get('unidadeMedida')?.value,
      ingredientes: this.produtoForm.get('ingredientes')?.value,
      marca: this.produtoForm.get('marca')?.value,
      descricao: this.produtoForm.get('descricao')?.value,
      paisOrigem: this.produtoForm.get('paisOrigem')?.value,
      validade: this.produtoForm.get('validade')?.value.toISOString(),
      categorias: this.produtoForm.get('categorias')?.value,
      tags: this.produtoForm.get('tags')?.value,
    };


    console.log('Produto cadastrado', novoProduto);

    if (this.produto && this.produto.produtoId) {
      // Atualizar produto existente
      novoProduto.produtoId = this.produto.produtoId;
      this.produtoService.updateProduct(novoProduto).subscribe(
        (response: any) => {
          if (response && response.produtoId) {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Produto "${response.nome}" atualizado com sucesso!`,
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
              detail:
                'Ocorreu um erro ao atualizar o produto. Tente novamente.',
            });
          }
        },
        (error) => {
          console.error('Erro ao atualizar produto:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail:
              'Ocorreu um erro ao atualizar o produto. Verifique sua conexão e tente novamente.',
          });
        }
      );
    } else {
      // Criar um novo produto
      if (this.produtoForm.valid) {
        this.produtoService.postProduct(novoProduto).subscribe(
          (response: any) => {
            if (response && response.produtoId) {
              this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: `Produto "${response.nome}" cadastrado com sucesso!`,
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
                detail:
                  'Ocorreu um erro ao cadastrar o produto. Tente novamente.',
              });
            }
          },
          (error) => {
            console.error('Erro ao cadastrar produto:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail:
                'Ocorreu um erro ao cadastrar o produto. Verifique sua conexão e tente novamente.',
            });
          }
        );
      }
    }
  }

  onCancel(): void {
    this.produtoForm.reset();
    this.cancel.emit();
  }

  validadeValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const validade = new Date(control.value);
    const today = new Date();
    if (validade < today) {
      return { invalidDate: true };
    }
    return null;
  }
}
