import { Injectable } from '@angular/core';
import { Produto } from '../../Models/product.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService { // TODO: Serviço de teste
  private products: Produto[] = [
    {
      id: 1,
      nome: 'Lidando com o nome de um produto muito grande',
      descricao: 'Descrição do Produto 1',
      marca: 'Marca 1',
      validade: new Date(),
      peso: 100,
      unidadeDeMedida: 'g',
      ingredientes: 'Ingrediente 1, Ingrediente 2',
      paisOrigem: 'Brasil',
      categoria: 'Alimentos',
    },
    {
      id: 2,
      nome: 'Produto 2',
      descricao: 'Descrição do Produto 2',
      marca: 'Marca 2',
      validade: new Date(),
      peso: 200,
      unidadeDeMedida: 'ml',
      ingredientes: 'Ingrediente A, Ingrediente B',
      paisOrigem: 'EUA',
      categoria: 'Bebidas',
    },
    {
      id: 3,
      nome: 'Produto 3',
      descricao: 'Descrição do Produto 2',
      marca: 'Marca 2',
      validade: new Date(),
      peso: 200,
      unidadeDeMedida: 'ml',
      ingredientes: 'Ingrediente A, Ingrediente B',
      paisOrigem: 'EUA',
      categoria: 'Bebidas',
    },
    {
      id: 4,
      nome: 'Produto 4',
      descricao: 'Descrição do Produto 2',
      marca: 'Marca 2',
      validade: new Date(),
      peso: 200,
      unidadeDeMedida: 'ml',
      ingredientes: 'Ingrediente A, Ingrediente B',
      paisOrigem: 'EUA',
      categoria: 'Bebidas',
    },
    {
      id: 5,
      nome: 'Produto 5',
      descricao: 'Descrição do Produto 2',
      marca: 'Marca 2',
      validade: new Date(),
      peso: 200,
      unidadeDeMedida: 'ml',
      ingredientes: 'Ingrediente A, Ingrediente B',
      paisOrigem: 'EUA',
      categoria: 'Bebidas',
    },
    {
      id: 6,
      nome: 'Produto 6',
      descricao: 'Descrição do Produto 2',
      marca: 'Marca 2',
      validade: new Date(),
      peso: 200,
      unidadeDeMedida: 'ml',
      ingredientes: 'Ingrediente A, Ingrediente B',
      paisOrigem: 'EUA',
      categoria: 'Bebidas',
    },
    {
      id: 7,
      nome: 'Produto 7',
      descricao: 'Descrição do Produto 2',
      marca: 'Marca 2',
      validade: new Date(),
      peso: 200,
      unidadeDeMedida: 'ml',
      ingredientes: 'Ingrediente A, Ingrediente B',
      paisOrigem: 'EUA',
      categoria: 'Bebidas',
    },
    {
      id: 8,
      nome: 'Produto 8',
      descricao: 'Descrição do Produto 2',
      marca: 'Marca 2',
      validade: new Date(),
      peso: 200,
      unidadeDeMedida: 'ml',
      ingredientes: 'Ingrediente A, Ingrediente B',
      paisOrigem: 'EUA',
      categoria: 'Bebidas',
    },
    {
      id: 9,
      nome: 'Produto 9',
      descricao: 'Descrição do Produto 2',
      marca: 'Marca 2',
      validade: new Date(),
      peso: 200,
      unidadeDeMedida: 'ml',
      ingredientes: 'Ingrediente A, Ingrediente B',
      paisOrigem: 'EUA',
      categoria: 'Bebidas',
    },
    {
      id: 10,
      nome: 'Produto 10',
      descricao: 'Descrição do Produto 2',
      marca: 'Marca 2',
      validade: new Date(),
      peso: 200,
      unidadeDeMedida: 'ml',
      ingredientes: 'Ingrediente A, Ingrediente B',
      paisOrigem: 'EUA',
      categoria: 'Bebidas',
    },
    {
      id: 11,
      nome: 'Produto 11',
      descricao: 'Descrição do Produto 2',
      marca: 'Marca 2',
      validade: new Date(),
      peso: 200,
      unidadeDeMedida: 'ml',
      ingredientes: 'Ingrediente A, Ingrediente B',
      paisOrigem: 'EUA',
      categoria: 'Bebidas',
    },
    {
      id: 12,
      nome: 'Produto 12',
      descricao: 'Descrição do Produto 2',
      marca: 'Marca 2',
      validade: new Date(),
      peso: 200,
      unidadeDeMedida: 'ml',
      ingredientes: 'Ingrediente A, Ingrediente B',
      paisOrigem: 'EUA',
      categoria: 'Bebidas',
    },
    {
      id: 13,
      nome: 'Produto 13',
      descricao: 'Descrição do Produto 2',
      marca: 'Marca 2',
      validade: new Date(),
      peso: 200,
      unidadeDeMedida: 'ml',
      ingredientes: 'Ingrediente A, Ingrediente B',
      paisOrigem: 'EUA',
      categoria: 'Bebidas',
    },
    {
      id: 14,
      nome: 'Produto 14',
      descricao: 'Descrição do Produto 2',
      marca: 'Marca 2',
      validade: new Date(),
      peso: 200,
      unidadeDeMedida: 'ml',
      ingredientes: 'Ingrediente A, Ingrediente B',
      paisOrigem: 'EUA',
      categoria: 'Bebidas',
    },
    {
      id: 15,
      nome: 'Produto 15',
      descricao: 'Descrição do Produto 2',
      marca: 'Marca 2',
      validade: new Date(),
      peso: 200,
      unidadeDeMedida: 'ml',
      ingredientes: 'Ingrediente A, Ingrediente B',
      paisOrigem: 'EUA',
      categoria: 'Bebidas',
    },
  ];

  getProducts(page: number = 0, size: number = 10): Observable<{ data: Produto[], total: number }> {
    const start = page * size;
    const end = start + size;
    const paginatedProducts = this.products.slice(start, end);
    return of({ data: paginatedProducts, total: this.products.length });
  }

  getProductById(id: number): Observable<Produto> {
    const product = this.products.find((p) => p.id === id);
    return of(product || ({} as Produto));
  }

  createProduct(product: Produto): Observable<Produto> {
    product.id = this.products.length + 1;
    this.products.push(product);
    return of(product);
  }

  updateProduct(id: number, product: Produto): Observable<Produto> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products[index] = product;
    }
    return of(product);
  }

  deleteProduct(id: number): Observable<void> {
    this.products = this.products.filter((p) => p.id !== id);
    return of();
  }

  getSimilares(currentProductId: number): Produto[] {
    return this.products.filter(product => product.id !== currentProductId).slice(0, 8);
  }
}
