import {Component, OnInit} from '@angular/core';
import {Produto} from '../../../Models/product.model';
import {ProdutosService} from '../../../Services/Produto/produtos.service';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {TableModule} from 'primeng/table';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ButtonModule} from 'primeng/button';
import {PaginatorModule} from 'primeng/paginator';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputNumberModule} from 'primeng/inputnumber';
import {CheckboxModule} from 'primeng/checkbox';
import {InputMaskModule} from 'primeng/inputmask';
import {CardModule} from 'primeng/card';
import {TooltipModule} from 'primeng/tooltip';
import {ProdutoFormComponent} from '../produto-form/produto-form.component';
import {ProdutoDetailsComponent} from '../produto-details/produto-details.component';
import {QRCodeModule} from 'angularx-qrcode';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {InputSwitchModule} from 'primeng/inputswitch';
import {environment} from '../../../../environments/environment.development';

@Component({
  selector: 'app-produto-list',
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
    ProdutoFormComponent,
    ProdutoDetailsComponent,
    QRCodeModule,
    ProgressSpinnerModule,
    CardModule,
    InputSwitchModule,
  ],
  templateUrl: './produto-list.component.html',
  styleUrl: './produto-list.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ProdutoListComponent implements OnInit {
  produtos: Produto[] = [];
  selectedProduct!: Produto;
  displayFormDialog: boolean = false;
  displayDetailsDialog: boolean = false;
  displayQrCodeDialog: boolean = false;
  isEditMode: boolean = false;
  isViewMode: boolean = false;
  selectedQrCode: string = 'nao vazio';
  infoQrCode: string = '';
  qrCodeFormatado: string = '';
  isLinkQrCode: boolean = false;
  baseUrl: string = environment.apiUrl;

  // Variáveis para paginação
  totalRecords: number = 0;
  rows: number = 12;
  first: number = 0;

  constructor(
    private produtoService: ProdutosService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const page = this.first / this.rows;
    this.produtoService
      .getAllProducts(page, this.rows)
      .subscribe((result) => {
        this.produtos = result.data;
        this.totalRecords = result.total; // Total de registros
      });
  }

  showFormDialog(): void {
    this.selectedProduct = {} as Produto;
    this.isEditMode = false;
    this.displayFormDialog = true;
  }

  onSave(): void {
    this.loadProducts(); // Recarrega a lista de produtos após salvar
    this.closeFormDialog(); // Fecha o modal do formulário
  }

  showQrCodeDialog(produto: Produto): void {
    this.produtoService
      .getProductById(produto.produtoId!)
      .subscribe((data: any) => {
        this.selectedProduct = data;
        this.infoQrCode = JSON.stringify(data);
        this.qrCodeFormatado = this.formatProdutoData(data);

        // Atualiza o QR code com base no estado atual do switch
        this.updateQrCode();

        this.displayQrCodeDialog = true;
      });
  }

  formatProdutoData(produto: Produto): string {
    let formattedData = '';
    formattedData += `<p><strong>Nome:</strong> ${produto.nome}</p>`;
    formattedData += `<p><strong>Ingredientes:</strong> ${produto.ingredientes}</p>`;
    formattedData += `<p><strong>Descrição:</strong> ${produto.descricao}</p>`;
    formattedData += `<p><strong>Marca:</strong> ${produto.marca}</p>`;
    formattedData += `<p><strong>Peso:</strong> ${produto.peso} ${produto.unidadeMedida}</p>`;
    formattedData += `<p><strong>Preço:</strong> R$ ${produto.preco.toFixed(
      2
    )}</p>`;
    formattedData += `<p><strong>País de Origem:</strong> ${produto.paisOrigem}</p>`;
    formattedData += `<p><strong>Categorias:</strong> ${produto.categorias
      .map((categoria: any) => categoria.nome)
      .join(', ')}</p>`;
    // formattedData += `Tags: ${produto.tags
    //   .map((tag: any) => tag.nome)
    //   .join(', ')}\n`;

    return formattedData;
  }

  generateProductLink(produto: any): string {
    return `http://localhost:4200/produtos/${produto.produtoId}`;
  }

  updateQrCode(): void {
    if (this.isLinkQrCode) {
      const link = this.generateProductLink(this.selectedProduct);
      this.selectedQrCode = `LINK:${link}`;
    } else {
      this.selectedQrCode = `DADOS:${this.qrCodeFormatado}`;
    }
  }

  toggleQrCodeType(): void {
    this.updateQrCode();
  }

  closeFormDialog() {
    this.displayFormDialog = false;
  }

  closeDetailsDialog() {
    this.selectedProduct = {} as Produto;
    this.displayDetailsDialog = false;
  }

  closeQrCodeDialog() {
    this.displayQrCodeDialog = false;
  }

  onPageChange(event: any): void {
    this.first = event.first; // Índice do primeiro registro da página
    this.rows = event.rows; // Número de registros por página
    this.loadProducts(); // Carregar produtos da página atual
  }

  viewProduct(produto: Produto): void {
    this.produtoService
      .getProductById(produto.produtoId!)
      .subscribe((data: any) => {
        this.selectedProduct = {
          ...data,
          categorias: data.categorias.map((categoria: any) => categoria.nome).join(', '),
          tags: data.tags.map((tag: any) => tag.nome).join(', '),
        };
        this.isEditMode = false;
        this.isViewMode = true;
        this.displayDetailsDialog = true;
      });
  }

  editProduct(produto: any) {
    this.produtoService
      .getProductById(produto.produtoId)
      .subscribe((data: any) => {
        this.selectedProduct = data;
        this.isEditMode = true;
        this.isViewMode = false;
        this.displayFormDialog = true;

        // Forçar a atualização do componente de formulário
        setTimeout(() => {
          this.displayFormDialog = false;
          this.displayFormDialog = true;
        }, 0);
      });
  }

  deleteProduct(produto: Produto): void {
    this.produtoService.getProductById(produto.produtoId!).subscribe({
      next: (detalhesProduto) => {
        this.confirmationService.confirm({
          message: 'Você tem certeza que deseja excluir este produto?',
          header: 'Confirmação de Exclusão',
          icon: 'pi pi-info-circle',
          acceptButtonStyleClass: 'p-button-danger p-button-text',
          rejectButtonStyleClass: 'p-button-text p-button-text',
          acceptLabel: 'Sim',
          rejectLabel: 'Não',
          acceptIcon: 'none',
          rejectIcon: 'none',
          accept: () => {
            this.produtoService.deleteProduct(produto.produtoId!).subscribe({
              next: () => {
                this.messageService.add({
                  severity: 'info',
                  summary: 'Confirmado',
                  detail: `Produto ${detalhesProduto.nome} excluído com sucesso`,
                });
                this.loadProducts();
              },
              error: (error) => {
                console.error('Erro ao excluir produto:', error);
                this.messageService.add({
                  severity: 'error',
                  summary: 'Erro',
                  detail: 'Não foi possível excluir o registro.',
                });
              },
            });
          },
          reject: () => {
            // Ação quando o usuário cancela
          },
        });
      },
      error: (error) => {
        console.error('Erro ao obter detalhes do produto:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Não foi possível obter detalhes do produto.',
        });
      },
    });
  }

  selectInfoProduct(): void {
    this.selectedQrCode = this.qrCodeFormatado;
  }

  printQrCode() {
    const qrElement = document.querySelector(
      'qrcode canvas'
    ) as HTMLCanvasElement;
    if (qrElement) {
      const dataUrl = qrElement.toDataURL('image/png');

      const printWindow = window.open('', '_blank', 'width=600,height=400');
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(`
          <html>
            <head>
              <title>Imprimir QR Code</title>
              <style>
                body {
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  height: 100vh;
                  margin: 0;
                }
                img {
                  width: 350px;
                  height: 350px;
                }
              </style>
            </head>
            <body>
              <img src="${dataUrl}" alt="QR Code">
              <script type="text/javascript">
                window.onload = function() {
                  window.print();
                  window.close();
                };
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  }

  // saveProduct(product: Produto): void {
  //   if (this.isEditMode) {
  //     if (product.id) {
  //       this.produtoService.updateProduct(product.id, product).subscribe(() => {
  //         this.loadProducts();
  //       });
  //     } else {
  //       this.produtoService.createProduct(product).subscribe(() => {
  //         this.loadProducts();
  //       });
  //     }
  //   }
  //   this.displayFormDialog = false;
  // }
}
