import { Injectable } from '@angular/core';
import { Produto } from '../../Models/product.model';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  // TODO: Serviço de teste

  private apiUrl: string = environment.apiUrl;
  private products: Produto[] = [];

  constructor(private http: HttpClient) {}

  // private products: Produto[] = [
  //   {
  //     id: 1,
  //     nome: 'Lidando com o nome de um produto muito grande',
  //     descricao: 'Descrição do Produto 1',
  //     marca: 'Marca 1',
  //     validade: new Date(),
  //     peso: 100,
  //     unidadeMedida: 'g',
  //     ingredientes: 'Ingrediente 1, Ingrediente 2',
  //     paisOrigem: 'Brasil',
  //     categoria: 'Alimentos',
  //     preco: 56.00
  //   },
  //   {
  //     id: 2,
  //     nome: 'Produto 2',
  //     descricao: 'Descrição do Produto 2',
  //     marca: 'Marca 2',
  //     validade: new Date(),
  //     peso: 200,
  //     unidadeMedida: 'ml',
  //     ingredientes: 'Ingrediente A, Ingrediente B',
  //     paisOrigem: 'EUA',
  //     categoria: 'Bebidas',
  //     preco: 56.00
  //   },
  //   {
  //     id: 3,
  //     nome: 'Produto 3',
  //     descricao: 'Descrição do Produto 2',
  //     marca: 'Marca 2',
  //     validade: new Date(),
  //     peso: 200,
  //     unidadeMedida: 'ml',
  //     ingredientes: 'Ingrediente A, Ingrediente B',
  //     paisOrigem: 'EUA',
  //     categoria: 'Bebidas',
  //     preco: 56.00
  //   },
  //   {
  //     id: 4,
  //     nome: 'Produto 4',
  //     descricao: 'Descrição do Produto 2',
  //     marca: 'Marca 2',
  //     validade: new Date(),
  //     peso: 200,
  //     unidadeMedida: 'ml',
  //     ingredientes: 'Ingrediente A, Ingrediente B',
  //     paisOrigem: 'EUA',
  //     categoria: 'Bebidas',
  //     preco: 56.00
  //   },
  //   {
  //     id: 5,
  //     nome: 'Produto 5',
  //     descricao: 'Descrição do Produto 2',
  //     marca: 'Marca 2',
  //     validade: new Date(),
  //     peso: 200,
  //     unidadeMedida: 'ml',
  //     ingredientes: 'Ingrediente A, Ingrediente B',
  //     paisOrigem: 'EUA',
  //     categoria: 'Bebidas',
  //     preco: 56.00
  //   },
  //   {
  //     id: 6,
  //     nome: 'Produto 6',
  //     descricao: 'Descrição do Produto 2',
  //     marca: 'Marca 2',
  //     validade: new Date(),
  //     peso: 200,
  //     unidadeMedida: 'ml',
  //     ingredientes: 'Ingrediente A, Ingrediente B',
  //     paisOrigem: 'EUA',
  //     categoria: 'Bebidas',
  //     preco: 56.00
  //   },
  //   {
  //     id: 7,
  //     nome: 'Produto 7',
  //     descricao: 'Descrição do Produto 2',
  //     marca: 'Marca 2',
  //     validade: new Date(),
  //     peso: 200,
  //     unidadeMedida: 'ml',
  //     ingredientes: 'Ingrediente A, Ingrediente B',
  //     paisOrigem: 'EUA',
  //     categoria: 'Bebidas',
  //     preco: 56.00
  //   },
  //   {
  //     id: 8,
  //     nome: 'Produto 8',
  //     descricao: 'Descrição do Produto 2',
  //     marca: 'Marca 2',
  //     validade: new Date(),
  //     peso: 200,
  //     unidadeMedida: 'ml',
  //     ingredientes: 'Ingrediente A, Ingrediente B',
  //     paisOrigem: 'EUA',
  //     categoria: 'Bebidas',
  //     preco: 56.00
  //   },
  //   {
  //     id: 9,
  //     nome: 'Produto 9',
  //     descricao: 'Descrição do Produto 2',
  //     marca: 'Marca 2',
  //     validade: new Date(),
  //     peso: 200,
  //     unidadeMedida: 'ml',
  //     ingredientes: 'Ingrediente A, Ingrediente B',
  //     paisOrigem: 'EUA',
  //     categoria: 'Bebidas',
  //     preco: 56.00
  //   },
  //   {
  //     id: 10,
  //     nome: 'Produto 10',
  //     descricao: 'Descrição do Produto 2',
  //     marca: 'Marca 2',
  //     validade: new Date(),
  //     peso: 200,
  //     unidadeMedida: 'ml',
  //     ingredientes: 'Ingrediente A, Ingrediente B',
  //     paisOrigem: 'EUA',
  //     categoria: 'Bebidas',
  //     preco: 56.00
  //   },
  //   {
  //     id: 11,
  //     nome: 'Produto 11',
  //     descricao: 'Descrição do Produto 2',
  //     marca: 'Marca 2',
  //     validade: new Date(),
  //     peso: 200,
  //     unidadeMedida: 'ml',
  //     ingredientes: 'Ingrediente A, Ingrediente B',
  //     paisOrigem: 'EUA',
  //     categoria: 'Bebidas',
  //     preco: 56.00
  //   },
  //   {
  //     id: 12,
  //     nome: 'Produto 12',
  //     descricao: 'Descrição do Produto 2',
  //     marca: 'Marca 2',
  //     validade: new Date(),
  //     peso: 200,
  //     unidadeMedida: 'ml',
  //     ingredientes: 'Ingrediente A, Ingrediente B',
  //     paisOrigem: 'EUA',
  //     categoria: 'Bebidas',
  //     preco: 56.00
  //   },
  //   {
  //     id: 13,
  //     nome: 'Produto 13',
  //     descricao: 'Descrição do Produto 2',
  //     marca: 'Marca 2',
  //     validade: new Date(),
  //     peso: 200,
  //     unidadeMedida: 'ml',
  //     ingredientes: 'Ingrediente A, Ingrediente B',
  //     paisOrigem: 'EUA',
  //     categoria: 'Bebidas',
  //     preco: 56.00
  //   },
  //   {
  //     id: 14,
  //     nome: 'Produto 14',
  //     descricao: 'Descrição do Produto 2',
  //     marca: 'Marca 2',
  //     validade: new Date(),
  //     peso: 200,
  //     unidadeMedida: 'ml',
  //     ingredientes: 'Ingrediente A, Ingrediente B',
  //     paisOrigem: 'EUA',
  //     categoria: 'Bebidas',
  //     preco: 56.00
  //   },
  //   {
  //     id: 15,
  //     nome: 'Produto 15',
  //     descricao: 'Descrição do Produto 2',
  //     marca: 'Marca 2',
  //     validade: new Date(),
  //     peso: 200,
  //     unidadeMedida: 'ml',
  //     ingredientes: 'Ingrediente A, Ingrediente B',
  //     paisOrigem: 'EUA',
  //     categoria: 'Bebidas',
  //     preco: 56.00
  //   },
  // ];

  private fetchAllProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Produto/v1/Produtos`);
  }

  // Método para obter produtos paginados
  getAllProducts(
    page: number = 0,
    size: number = 12
  ): Observable<{ data: any[]; total: number }> {
    return this.fetchAllProducts().pipe(
      map((response) => {
        let products: any[] = Array.isArray(response)
          ? response
          : response?.produtos || [];

        if (!Array.isArray(products) || products.length === 0) {
          return { data: [], total: 0 };
        }

        this.products = products; // Armazena produtos recebidos

        const start = page * size;
        const end = start + size;
        const paginatedProducts = this.products.slice(start, end);
        return { data: paginatedProducts, total: this.products.length };
      })
    );
  }

  // getProducts(page: number = 0, size: number = 12): Observable<{ data: Produto[], total: number }> {
  //   const start = page * size;
  //   const end = start + size;
  //   const paginatedProducts = this.products.slice(start, end);
  //   return of({ data: paginatedProducts, total: this.products.length });
  // }

  getProductById(id: string): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/Produto/v1/Produtos/${id}`);
  }

  // getProductById(id: number | string): Observable<Produto> {
  //   return this.http.get<Produto>(`${this.apiUrl}/Produto/v1/Produtos/${id}`);
  // }

  postProduct(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Produto/v1/Produtos`, formData);
  }

  updateProduct(produto: Produto): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Produto/v1/Produtos`, produto);
  }

  // updateProduct(id: number, product: Produto): Observable<Produto> {
  //   const index = this.products.findIndex((p) => p.id === id);
  //   if (index !== -1) {
  //     this.products[index] = product;
  //   }
  //   return of(product);
  // }

  deleteProduct(produtoId: string): Observable<void> {
    const body = { produtoId };
    return this.http.delete<any>(`${this.apiUrl}/Produto/v1/Produtos`, {
      body,
    });
  }

  getSimilares(currentProductId: number): any {
    //   return this.products.filter(product => product.id !== currentProductId).slice(0, 8);
  }
}
