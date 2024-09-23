import { Injectable } from '@angular/core';
import { Produto } from '../../Models/product.model';
import {catchError, map, Observable, throwError} from 'rxjs';
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

  // getProdutosSimilares(id: string): Observable<any> {
  //   return this.http.get<any>(`${this.apiUrl}/Produto/v1/Produtos/${id}/Similares`);
  // }

  getProdutosSimilares(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Produto/v1/Produtos/${id}/Similares`).pipe(
      catchError(error => {
        console.error('Erro ao obter produtos similares:', error);
        return throwError(() => new Error('Erro ao obter produtos similares. Por favor, tente novamente mais tarde.'));
      })
    );
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


}
