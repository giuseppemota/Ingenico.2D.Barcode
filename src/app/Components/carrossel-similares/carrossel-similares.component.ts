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

  constructor(
    private route: ActivatedRoute,
    private productService: ProdutosService
  ) {}

  ngOnInit() {
    const produtoId = this.route.snapshot.params['id'];
    this.loadSimilares(produtoId);
  }

  loadSimilares(id: string) {
    this.productService.getProdutosSimilares(id).subscribe((data: any) => {
      this.produtosSimilares = data;
    });
  }

}


