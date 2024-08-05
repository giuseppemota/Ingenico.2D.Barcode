import { Injectable } from '@angular/core';
import { Produto } from '../../Models/product.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
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
}
