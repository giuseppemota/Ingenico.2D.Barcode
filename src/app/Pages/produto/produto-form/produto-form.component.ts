import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {Produto} from '../../../Models/product.model';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {CardModule} from 'primeng/card';
import {InputMaskModule} from 'primeng/inputmask';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {PaginatorModule} from 'primeng/paginator';
import {ButtonModule} from 'primeng/button';
import {CommonModule} from '@angular/common';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputNumberModule} from 'primeng/inputnumber';
import {CheckboxModule} from 'primeng/checkbox';
import {CalendarModule} from 'primeng/calendar';
import {MessageModule} from 'primeng/message';
import {ProdutosService} from '../../../Services/Produto/produtos.service';
import {MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {ChipsModule} from 'primeng/chips';
import {MultiSelectModule} from 'primeng/multiselect';
import {FileUpload, FileUploadModule} from 'primeng/fileupload';
import {EditorModule} from 'primeng/editor';

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
    FileUploadModule,
    EditorModule,
  ],
  templateUrl: './produto-form.component.html',
  styleUrl: './produto-form.component.scss',
})
export class ProdutoFormComponent implements OnInit {
  @Input() produto!: Produto;
  @Output() save = new EventEmitter<Produto>();
  @Output() cancel = new EventEmitter<void>();
  @ViewChild('fileUpload') fileUpload!: FileUpload;
  selectedImage: File | null = null;

  categorias = [
    {nome: 'Alimentos e Bebidas'},
    {nome: 'Carnes e Aves'},
    {nome: 'Frutas, Verduras e Legumes'},
    {nome: 'Laticínios e Ovos'},
    {nome: 'Padaria e Confeitaria'},
    {nome: 'Bebidas'},
    {nome: 'Limpeza'},
    {nome: 'Higiene e Beleza'},
    {nome: 'Papelaria'},
    {nome: 'Pet Shop'},
    {nome: 'Congelados'},
    {nome: 'Bebidas Alcoólicas'},
    {nome: 'Massas e Pizzas'},
    {nome: 'Doces e Sobremesas'},
    {nome: 'Cereais e Grãos'},
    {nome: 'Óleos e Temperos'},
    {nome: 'Petiscos e Snacks'},
    {nome: 'Saudáveis e Especiais'},
    {nome: 'Pescados e Frutos do Mar'},
    {nome: 'Mercearia'},
    {nome: 'Utilidades Domésticas'},
    {nome: 'Cuidados com a Casa'},
    {nome: 'Bebê e Infantil'},
  ];

  tags = [
    {nome: '🌾 grão'},
    {nome: '🌽 cereal'},
    {nome: '🥕 legume'},
    {nome: '🍎 fruta'},
    {nome: '🥬 verdura'},
    {nome: '🥛 laticínio'},
    {nome: '🥩 carne'},
    {nome: '🍗 ave'},
    {nome: '🐟 peixe'},
    {nome: '🦐 marisco'},
    {nome: '🥤 bebidas'},
    {nome: '🍬 doce'},
    {nome: '🍰 sobremesa'},
    {nome: '🍝 massa'},
    {nome: '🍕 pizza'},
    {nome: '🍿 lanche'},
    {nome: '🧂 tempero'},
    {nome: '🫒 óleo'},
    {nome: '❄️ congelado'},
    {nome: '🥖 padaria'},
    {nome: '🍩 confeitaria'},
    {nome: '🍺 bebida alcoólica'},
    {nome: '🧴 limpeza'},
    {nome: '🧼 higiene'},
    {nome: '💄 beleza'},
    {nome: '📄 papelaria'},
    {nome: '🐶 pet shop'},
    {nome: '🥗 saudável'},
    {nome: '⭐ especial'},
    {nome: '🛒 mercearia'},
    {nome: '🏠 utilidade doméstica'},
    {nome: '🏡 casa'},
    {nome: '👶 bebê'},
    {nome: '🧸 infantil'},
    {nome: '♻️ plástico'},
    {nome: '🔩 metal'},
    {nome: '🍾 vidro'},
    {nome: '🪵 madeira'},
    {nome: '📦 papelão'},
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
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.produtoForm = this.fb.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(200),
        ],
      ],
      marca: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(200),
        ],
      ],
      descricao: ['', [Validators.required, Validators.minLength(10)]],
      dataFabricacao: ['', [Validators.required, this.fabricacaoValidator]],
      validade: ['', [Validators.required, this.validadeValidator]],
      lote: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
      peso: [
        0,
        [Validators.required, Validators.min(0.1), Validators.max(5000)],
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
      tags: [[], Validators.required],
    });
    if (this.produto) {
      this.produtoForm.patchValue(this.produto);
    }
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes['produto'] && this.produto) {
  //     this.loadProdutoData(this.produto);
  //     setTimeout(() => {
  //       const descricaoControl = this.produtoForm.get('descricao');
  //       descricaoControl?.setValue(this.produto.descricao);
  //       this.changeDetectorRef.detectChanges();
  //     }, 0);
  //   }
  // }


  // loadProdutoData(produto: Produto) {
  //   if (this.produtoForm) {
  //     if (produto.produtoId) {
  //       const nomeCategorias = Array.isArray(produto.categorias)
  //         ? produto.categorias.map((categoria: any) => ({
  //           nome: categoria.nome,
  //         }))
  //         : [];
  //
  //       const nomeTags = Array.isArray(produto.tags)
  //         ? produto.tags.map((tag: any) => ({
  //           nome: tag.nome,
  //         }))
  //         : [];
  //
  //
  //       // Atualizando o formulário com os valores do produto
  //       this.produtoForm.patchValue({
  //         nome: produto.nome,
  //         marca: produto.marca,
  //         descricao: produto.descricao,
  //         validade: produto.validade ? new Date(produto.validade) : null,
  //         unidadeMedida: produto.unidadeMedida || null,
  //         dataFabricacao: produto.dataFabricacao
  //           ? new Date(produto.dataFabricacao)
  //           : null,
  //         lote: produto.lote,
  //         peso: produto.peso,
  //         preco: produto.preco,
  //         ingredientes: produto.ingredientes,
  //         paisOrigem: produto.paisOrigem,
  //         categorias: nomeCategorias,
  //         tags: nomeTags,
  //       });
  //     }
  //   } else {
  //     console.error('produtoForm não definido');
  //   }
  // }

  onSave(): void {
    // Construir o objeto novoProduto com as informações do formulário
    // const novoProduto: Produto = {
    //   nome: this.produtoForm.get('nome')?.value,
    //   preco: this.produtoForm.get('preco')?.value,
    //   peso: this.produtoForm.get('peso')?.value,
    //   unidadeMedida: this.produtoForm.get('unidadeMedida')?.value,
    //   ingredientes: this.produtoForm.get('ingredientes')?.value,
    //   marca: this.produtoForm.get('marca')?.value,
    //   descricao: this.produtoForm.get('descricao')?.value,
    //   paisOrigem: this.produtoForm.get('paisOrigem')?.value,
    //   validade: this.produtoForm.get('validade')?.value
    //     ? this.produtoForm.get('validade')?.value
    //     : null,
    //   dataFabricacao: this.produtoForm.get('dataFabricacao')?.value
    //     ? this.produtoForm.get('dataFabricacao')?.value
    //     : null,
    //   lote: this.produtoForm.get('lote')?.value,
    //
    //   // Aqui, cada string será mapeada para um objeto com a chave `nome`
    //   categorias: this.produtoForm.get('categorias')?.value
    //     ? this.produtoForm
    //       .get('categorias')
    //       ?.value.map((categoria: string) => ({nome: categoria}))
    //     : [],
    //
    //   // Mesma coisa para tags
    //   tags: this.produtoForm.get('tags')?.value
    //     ? this.produtoForm
    //       .get('tags')
    //       ?.value.map((tag: string) => ({nome: tag}))
    //     : []
    // };

    const formData = this.createFormData(this.produtoForm, this.selectedImage);

    if (this.produto && this.produto.produtoId) {
      // Atualizar produto existente
      formData.append('produtoId', this.produto.produtoId);
      this.produtoService.updateProduct(formData).subscribe(
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
              this.router.navigate(['produtos']).then();
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
        this.produtoService.postProduct(formData).subscribe(
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
                this.router.navigate(['produtos']).then();
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
    this.fileUpload.clear();
    this.selectedImage = null;
    this.cancel.emit();
  }

  validadeValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const validade = new Date(control.value);
    const today = new Date();
    if (validade < today) {
      return {invalidDate: true};
    }
    return null;
  }

  fabricacaoValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const fabricacao = new Date(control.value);
    const today = new Date();
    if (fabricacao > today) {
      return {invalidDate: true};
    }
    return null;
  }

  onImageSelect(event: any) {
    const file = event.files[0];
    if (file) {
      this.selectedImage = file;
      console.log('Imagem selecionada:', this.selectedImage);
    }
  }

  createFormData(produtoForm: any, selectedImage: File | null): FormData {
    const formData = new FormData();

    formData.append('nome', produtoForm.get('nome')?.value);
    formData.append('preco', produtoForm.get('preco')?.value);
    formData.append('peso', produtoForm.get('peso')?.value);
    formData.append('unidadeMedida', produtoForm.get('unidadeMedida')?.value);
    formData.append('ingredientes', produtoForm.get('ingredientes')?.value);
    formData.append('marca', produtoForm.get('marca')?.value);
    formData.append('descricao', produtoForm.get('descricao')?.value);
    formData.append('paisOrigem', produtoForm.get('paisOrigem')?.value);

    if (produtoForm.get('validade')?.value) {
      formData.append(
        'validade',
        produtoForm.get('validade')?.value.toISOString()
      );
    }

    if (produtoForm.get('dataFabricacao')?.value) {
      formData.append(
        'dataFabricacao',
        produtoForm.get('dataFabricacao')?.value.toISOString()
      );
    }

    formData.append('lote', produtoForm.get('lote')?.value);

    // Adicionando categorias com índice no nome
    const categorias = produtoForm.get('categorias')?.value;
    categorias.forEach((categoria: any, index: number) => {
      formData.append(`categorias[${index}].nome`, categoria.nome);
    });

    // Adicionando tags com índice no nome
    const tags = produtoForm.get('tags')?.value;
    tags.forEach((tag: any, index: number) => {
      formData.append(`tags[${index}].nome`, tag.nome);
    });

    // Se uma imagem foi selecionada, adiciona ao FormData
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    // Logando o FormData no console
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });

    return formData;
  }
}
