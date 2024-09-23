import { Component, Input, OnInit } from '@angular/core';
import { CarouselModule } from 'primeng/carousel';
import { Produto } from '../../Models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProdutosService } from '../../Services/Produto/produtos.service';

@Component({
  selector: 'carrossel-similares',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './carrossel-similares.component.html',
  styleUrl: './carrossel-similares.component.scss',
})
export class CarrosselSimilaresComponent implements OnInit {
  @Input() produtosSimilares: Produto[] = [];
  productImages: { [id: string]: string } = {};
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '560px',
      numVisible: 2,
      numScroll: 1,
    },
  ];
  imageForCarousel(id: string) {
    this.productService.getImagemProduto(id).subscribe((data: any) => {
      this.productImages[id] = data.imageData; // Armazena a imagem base64
    });
  }
  loadImagesForProducts(produtosSimilares: any[]) {
    produtosSimilares.forEach((product) => {
      this.imageForCarousel(product.produtoId);
    });
  }
  constructor(
    private route: ActivatedRoute,
    private productService: ProdutosService
  ) {}

  async ngOnInit() {
    const produtoId = this.route.snapshot.params['id'];
    await this.loadSimilares(produtoId);
    await this.loadImagesForProducts(this.produtosSimilares);
    console.log(this.produtosSimilares);
  }

  loadSimilares(id: string) {
    this.productService.getProdutosSimilares(id).subscribe((data: any) => {
      this.produtosSimilares = data;
    });
  }
}
