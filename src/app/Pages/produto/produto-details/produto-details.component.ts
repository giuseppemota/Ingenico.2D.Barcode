import {AfterViewInit, Component, Input, OnInit, Renderer2, RendererStyleFlags2} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProdutosService} from '../../../Services/Produto/produtos.service';
import {Produto} from '../../../Models/product.model';
import {CommonModule} from '@angular/common';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import {TagModule} from 'primeng/tag';
import {Button, ButtonModule} from 'primeng/button';
import {CarrosselSimilaresComponent} from '../../../Components/carrossel-similares/carrossel-similares.component';
import {RippleModule} from 'primeng/ripple';

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
export class ProdutoDetailsComponent implements OnInit, AfterViewInit {
  @Input() product: any = {};
  produtosSimilares: Produto[] = [];
  imagemProduto: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProdutosService,
    private router: Router,
    private renderer: Renderer2
  ) {
  }

  ngAfterViewInit() {
    if (typeof document !== 'undefined'){
      const qlaligncenter = document.getElementsByClassName('ql-align-center') as HTMLCollectionOf<HTMLElement>;
      const qlalignleft = document.getElementsByClassName('ql-align-left') as HTMLCollectionOf<HTMLElement>;
      const qlalignright = document.getElementsByClassName('ql-align-right') as HTMLCollectionOf<HTMLElement>;
      const qlalignjustify = document.getElementsByClassName('ql-align-justify') as HTMLCollectionOf<HTMLElement>;
      const divDescricao = document.getElementsByClassName('descricao-produto') as HTMLCollectionOf<HTMLElement>;

      if (qlaligncenter) {
        Array.from(qlaligncenter).forEach((element) => {
          this.renderer.setStyle(element, 'text-align', 'center', RendererStyleFlags2.Important);
        });
      }
      if (qlalignleft) {
        Array.from(qlalignleft).forEach((element) => {
          this.renderer.setStyle(element, 'text-align', 'left', RendererStyleFlags2.Important);
        });
      }
      if (qlalignright) {
        Array.from(qlalignright).forEach((element) => {
          this.renderer.setStyle(element, 'text-align', 'right', RendererStyleFlags2.Important);
        });
      }
      if (qlalignjustify) {
        Array.from(qlalignjustify).forEach((element) => {
          this.renderer.setStyle(element, 'text-align', 'justify', RendererStyleFlags2.Important);
        });
      }

      if (divDescricao) {
        Array.from(divDescricao).forEach((element) => {
          const images = element.getElementsByTagName('img');
          Array.from(images).forEach((img) => {
            this.renderer.setStyle(img, 'max-width', '400px');
          });
        });
      }
    }
  }

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
