import { Injectable } from '@angular/core';
import { delay, map, Observable, shareReplay, tap } from 'rxjs';
import { Product } from '../models/product.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'https://retoolapi.dev/U1A9pK/products/';

  products$: Observable<Product[]>

  constructor(private http: HttpClient) {
    this.initProducts()
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + id);
  }

  insertProduct(newProduct: Product): Observable<Product> {
    newProduct.modifiedDate = new Date();
    return this.http.post<Product>(this.baseUrl, newProduct);
  }

  getProductById(id: number): Observable<Product> {
    return this
              .products$
              .pipe(
                map(products => products.find(product => product.id == id))
              )
  }

  initProducts() {
    this.products$ = this
                      .http
                      .get<Product[]>(this.baseUrl)
                      .pipe(
                        tap(console.table),
                        shareReplay()
                      )
  }
}
