import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProdutosService } from '../../../Services/Produto/produtos.service';
import { Produto } from '../../../Models/product.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-produto-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produto-details.component.html',
  styleUrl: './produto-details.component.scss'
})
export class ProdutoDetailsComponent implements OnInit{

  @Input() product: any = {};

  constructor(private route: ActivatedRoute, private productService: ProdutosService) {}

  ngOnInit() {
    if (!this.product) {
      this.product = {} as Produto;
    }
    const idString = this.route.snapshot.paramMap.get('id');
    if (idString) {
      const id = +idString;
      this.productService.getProductById(id).subscribe((data: any) => {
        this.product = data;
      });
    }
  }

}
