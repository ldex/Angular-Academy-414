import { Injectable } from '@angular/core';
import { delay, Observable, tap } from 'rxjs';
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

  initProducts() {
    this.products$ = this
                      .http
                      .get<Product[]>(this.baseUrl)
                      .pipe(
                        delay(1500), // pour la démo!!
                        tap(console.table)
                      )
  }
}
