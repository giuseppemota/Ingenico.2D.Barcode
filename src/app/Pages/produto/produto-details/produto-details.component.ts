import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from '../../../Services/Produto/produtos.service';
import { Produto } from '../../../Models/product.model';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag';
import { Button, ButtonModule } from 'primeng/button';
import { CarrosselSimilaresComponent } from '../../../Components/carrossel-similares/carrossel-similares.component';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-produto-details',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    CarouselModule,
    TagModule,
    Button,
    CarrosselSimilaresComponent,
    ButtonModule,
    RippleModule
  ],
  templateUrl: './produto-details.component.html',
  styleUrl: './produto-details.component.scss',
})
export class ProdutoDetailsComponent implements OnInit {
  @Input() product: any = {};
  produtosSimilares: Produto[] = [];
  imagemProduto: number[] = [];
  constructor(
    private route: ActivatedRoute,
    private productService: ProdutosService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.product) {
      this.product = {} as Produto;
    }
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      this.productService.getProductById(idString).subscribe((data: any) => {
        this.product = {
          ...data,
          categorias: data.categorias.map((categoria: any) => categoria.nome),
        };

      });

      this.productService
        .getProdutosSimilares(idString)
        .subscribe((data: any) => {
          this.produtosSimilares = data;
        });

      this.productService.getImagemProduto(idString).subscribe((data: any) => {
        this.imagemProduto = data.imageData;
      });
    }
  }

  voltarParaLeituraQR() {
    this.router.navigate(['/leitor-qrcode']);
  }
}
