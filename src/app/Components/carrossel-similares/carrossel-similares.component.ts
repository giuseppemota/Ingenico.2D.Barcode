import {Component, OnInit} from '@angular/core';
import {CarouselModule} from "primeng/carousel";
import {Produto} from "../../Models/product.model";
import {ActivatedRoute} from "@angular/router";
import {ProdutosService} from "../../Services/Produto/produtos.service";

@Component({
  selector: 'app-carrossel-similares',
  standalone: true,
  imports: [
    CarouselModule
  ],
  templateUrl: './carrossel-similares.component.html',
  styleUrl: './carrossel-similares.component.scss'
})
export class CarrosselSimilaresComponent implements OnInit{
  produtosSimilares: Produto[] = [];
  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '560px',
      numVisible: 2,
      numScroll: 1
    }
  ];

  constructor(private route: ActivatedRoute, private productService: ProdutosService) {}

  ngOnInit() {
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const id = +idString;
      this.loadSimilares(id);
    }
  }

  // TODO: Função temporária de similares (1).
  loadSimilares(currentProductId: number) {
    this.produtosSimilares = this.productService.getSimilares(currentProductId);
  }
}
