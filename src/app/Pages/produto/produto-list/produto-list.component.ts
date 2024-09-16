import { Component, OnInit } from '@angular/core';
import { Produto } from '../../../Models/product.model';
import { ProdutosService } from '../../../Services/Produto/produtos.service';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { InputMaskModule } from 'primeng/inputmask';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { ProdutoFormComponent } from '../produto-form/produto-form.component';
import { ProdutoDetailsComponent } from '../produto-details/produto-details.component';
import { QRCodeModule } from 'angularx-qrcode';
import {ProgressSpinnerModule} from "primeng/progressspinner";

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
  isLoading = true;

  // Variáveis para paginação
  totalRecords: number = 0;
  rows: number = 12;
  first: number = 0;

  constructor(
    private produtoService: ProdutosService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    setTimeout(() =>{
      const page = this.first / this.rows;
      this.produtoService.getAllProducts(page, this.rows).subscribe((result) => {
        this.produtos = result.data;
        this.totalRecords = result.total; // Total de registros
      });
      this.isLoading = false;
    }, 1500);
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
        // Formatar o texto com os dados do produto
        this.infoQrCode = JSON.stringify(data);
        this.qrCodeFormatado = this.formatProdutoData(data);
        this.displayQrCodeDialog = true;
        this.selectLinkProduct();
      });
  }
  formatProdutoData(produto: Produto): string {
    let formattedData = '';
    formattedData += `Nome: ${produto.nome}\n`;

    formattedData += `Ingredientes: ${produto.ingredientes}\n`;
    formattedData += `Descrição: ${produto.descricao}\n`;
    formattedData += `Marca: ${produto.marca}\n`;
    formattedData += `Peso: ${produto.peso} ${produto.unidadeMedida}\n`;
    formattedData += `Preço: ${produto.preco}\n`;
    formattedData += `País de Origem: ${produto.paisOrigem}\n`;
    formattedData += `Categorias: ${produto.categorias
      .map((categoria: any) => categoria.nome)
      .join(', ')}\n`;
    // formattedData += `Tags: ${produto.tags
    //   .map((tag: any) => tag.nome)
    //   .join(', ')}\n`;

    return formattedData;
  }
  closeFormDialog() {
    this.displayFormDialog = false;
  }

  closeDetailsDialog() {
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
          categorias: data.categorias.map((categoria: any) => categoria.nome),
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
              next: (response) => {
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
  selectLinkProduct(): void {
    this.selectedQrCode =
      'http://localhost:4200/produtos/' + JSON.parse(this.infoQrCode).produtoId;
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
