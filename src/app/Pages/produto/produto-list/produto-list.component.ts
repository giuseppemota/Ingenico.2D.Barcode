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
import { Router } from '@angular/router';
import { ProdutoFormComponent } from '../produto-form/produto-form.component';
import { ProdutoDetailsComponent } from '../produto-details/produto-details.component';
import { QRCodeModule } from 'angularx-qrcode';
import { info } from 'console';

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

  // Variáveis para paginação
  totalRecords: number = 0;
  rows: number = 12; // Número de registros por página
  first: number = 0; // Índice do primeiro registro da página

  constructor(
    private produtoService: ProdutosService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    const page = this.first / this.rows;
    this.produtoService.getProducts(page, this.rows).subscribe((result) => {
      this.produtos = result.data;
      this.totalRecords = result.total; // Total de registros
    });
  }

  showFormDialog(): void {
    this.selectedProduct = {} as Produto;
    this.isEditMode = false;
    this.displayFormDialog = true;
  }

  showQrCodeDialog(produto: Produto): void {
    this.produtoService.getProductById(produto.id).subscribe((data: any) => {
      this.infoQrCode = JSON.stringify(data);
      this.displayQrCodeDialog = true;
      this.selectLinkProduct();
    });
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
    this.produtoService.getProductById(produto.id).subscribe((data: any) => {
      this.selectedProduct = data;
      this.isEditMode = false;
      this.isViewMode = true;
      this.displayDetailsDialog = true;
    });
  }

  editProduct(produto: any) {
    this.produtoService.getProductById(produto.id).subscribe((data: any) => {
      this.selectedProduct = data;
      this.isEditMode = true;
      this.isViewMode = false;
      this.displayFormDialog = true;
    });
  }

  deleteProduct(product: Produto): void {
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
        this.produtoService.deleteProduct(product.id).subscribe(() => {
          this.produtos = this.produtos.filter((p) => p.id !== product.id);
        });
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmado',
          detail: 'Registro excluído com sucesso',
        });
      },
      reject: () => {
        // Ação quando o usuário cancela
      },
    });
  }

  onSave(product: Produto): void {
    if (this.isEditMode) {
      if (product.id) {
        this.produtoService.updateProduct(product.id, product).subscribe(() => {
          this.loadProducts();
          this.closeFormDialog();
          this.router.navigate(['/produtos']);
        });
      } else {
        this.produtoService.createProduct(product).subscribe(() => {
          this.loadProducts();
          this.closeFormDialog();
          this.router.navigate(['/produtos']);
        });
      }
    }
  }
  selectInfoProduct(): void {
    this.infoQrCode;
    this.selectedQrCode = this.infoQrCode;
  }
  selectLinkProduct(): void {
    this.selectedQrCode =
      'http://localhost:4200/produtos/' + JSON.parse(this.infoQrCode).id;
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
